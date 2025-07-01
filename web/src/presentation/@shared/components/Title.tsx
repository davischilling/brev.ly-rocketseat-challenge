export type TitleProps = {
  title: string
}

export const Title = ({ title }: TitleProps) => {
  return <h1 className="font-semibold text-lg text-gray-900">{title}</h1>
}
