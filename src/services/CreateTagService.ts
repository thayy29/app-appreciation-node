import { TagsRepositories } from "../repositories/TagsRepositories";
import { getCustomRepository } from "typeorm";
class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if(!name) {
      throw new Error("Incorrect name");
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagsAlreadyExists = await tagsRepositories.findOne({
      name,
    });
    if (tagsAlreadyExists){
      throw new Error("Tag already exists!");
    }

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService}; 