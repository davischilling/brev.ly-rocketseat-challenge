import { createLinkMutation } from '@/domain/api/links'
import {
  CreateLinkDefaultValues,
  CreateLinkFormData,
  createLinkSchema,
} from '@/domain/validations/createLink'
import { LinkAlreadyExistsError } from '@/domain/errors/linkAlreadyExistError'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Input } from './Input'
import { Title } from './Title'

export const Form = () => {
  const queryClient = useQueryClient()
  const createLink = useMutation({
    ...createLinkMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('Link criado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      })
    },
    onError: (error: any) => {
      console.log('Error creating link:', error);
      
      if (error instanceof LinkAlreadyExistsError) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        })
      } else {
        toast.error('Erro ao criar link. Tente novamente.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        })
      }
    },
  })

  const handleSubmit = async (props: { value: CreateLinkFormData }) => {
    createLink.mutate(props.value)
  }

  const [hasErrorMessage, setHasErrorMessage] = useState<boolean>(false)
  const form = useForm({
    defaultValues: CreateLinkDefaultValues,
    onSubmit: handleSubmit,
    validators: {
      onChange: ({ value }) => {
        let errorMessage: string | undefined
        try {
          createLinkSchema.parse(value)
        } catch (err: any) {
          errorMessage = err.errors?.[0]?.message || 'Valor inválido'
        }
        setHasErrorMessage(!!errorMessage)
      },
    },
  })

  const handleErrors = (value: string, schema: (value: string) => void) => {
    try {
      schema(value)
      return undefined
    } catch (err: any) {
      return err.errors?.[0]?.message || 'Valor inválido'
    }
  }

  return (
    <div
      className={
        'bg-white p-8 rounded-lg border flex flex-col gap-6 min-h-[380px] w-full min-w-0 lg:w-[340px] lg:min-w-[340px]'
      }
    >
      <Title title="Novo Link" />
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="originalUrl"
          children={field => {
            let errorMessage: string | undefined = handleErrors(
              field.state.value,
              createLinkSchema.shape.originalUrl.parse
            )
            return (
              <Input
                label="link original"
                placeholder="https://example.com"
                prefix="https://"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.target.value)
                }
                errorMessage={field.state.value ? errorMessage : undefined}
              />
            )
          }}
        />

        <form.Field
          name="shortenedUrl"
          children={field => {
            let errorMessage: string | undefined = handleErrors(
              field.state.value,
              createLinkSchema.shape.shortenedUrl.parse
            )
            return (
              <Input
                label="link encurtado"
                placeholder="brev.ly/"
                prefix="brev.ly/"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.handleChange(e.target.value)
                }
                errorMessage={field.state.value ? errorMessage : undefined}
              />
            )
          }}
        />
        <button
          type="submit"
          disabled={hasErrorMessage}
          className="w-full mt-2 bg-blue-base text-white rounded-lg py-[15px] hover:bg-blue-dark transition-colors disabled:bg-indigo-300"
        >
          Salvar Link
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}
