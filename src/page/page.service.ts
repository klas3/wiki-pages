import { Injectable } from '@nestjs/common';
import Page from '../entity/Page';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  public async create(): Promise<Page> {
    const page = this.pageRepository.create({ pageVersions: [] });
    return this.pageRepository.save(page);
  }

  public async getAll(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  public async getById(id: string): Promise<Page> {
    return this.pageRepository.findOne(id, { relations: ['pageVersions'] });
  }

  public async update(page: Page): Promise<void> {
    await this.pageRepository.update(page.id, page);
  }
}
