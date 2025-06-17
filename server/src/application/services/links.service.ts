import { IRepository } from "@/domain/contracts";
import { Link } from "@/domain/entities";
import { CreateLinkDTO, ILink, ILinkToJSON } from "@/domain/models";

export class LinksService {
  constructor(
    private readonly linksRepository: IRepository<ILinkToJSON, ILink>
  ) { }

  async create(createLinkDto: CreateLinkDTO) {
    const linkEntity = Link.create(createLinkDto);
    return this.linksRepository.create(linkEntity.toJSON());
  }

  async findAll() {
    return this.linksRepository.findAll();
  }

  // async findOne(id: string) {
  //   return this.linksRepository.findById(id);
  // }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   return this.linksRepository.update(id, updateUserDto);
  // }

  // async remove(id: string) {
  //   return this.linksRepository.remove(id);
  // }
}
