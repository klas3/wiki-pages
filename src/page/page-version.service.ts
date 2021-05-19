import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PageVersion from '../entity/PageVersion';

@Injectable()
export class PageVersionService {
  constructor(
    @InjectRepository(PageVersion)
    private readonly pageVersionRepository: Repository<PageVersion>,
  ) {}

  public async create(pageVersion: PageVersion): Promise<PageVersion> {
    return this.pageVersionRepository.save(pageVersion);
  }

  public async getAllByPageId(pageId: string): Promise<PageVersion[]> {
    return this.pageVersionRepository.find({ pageId });
  }

  public async setPageId(id: string, pageId: string): Promise<void> {
    await this.pageVersionRepository.update(id, { pageId });
  }

  public async getById(id: string): Promise<PageVersion> {
    return this.pageVersionRepository.findOne(id);
  }

  public async setIsCurrent(id: string, isCurrent: boolean): Promise<void> {
    await this.pageVersionRepository.update(id, { isCurrent });
  }
}
