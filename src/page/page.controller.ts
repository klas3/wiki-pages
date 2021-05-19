import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import Page from 'src/entity/Page';
import PageVersion from 'src/entity/PageVersion';
import { PageVersionService } from './page-version.service';
import { PageService } from './page.service';

@Controller('/')
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly pageVersionService: PageVersionService,
  ) {}

  @Get('getPages')
  public async getPages(): Promise<Page[]> {
    return this.pageService.getAll();
  }

  @Get('getVersions/:pageId')
  public async getVersions(
    @Param('pageId') pageId: string,
  ): Promise<PageVersion[]> {
    return this.pageVersionService.getAllByPageId(pageId);
  }

  @Get('getVersion/:versionId')
  public async getVersion(
    @Param('versionId') versionId: string,
  ): Promise<PageVersion> {
    return this.pageVersionService.getById(versionId);
  }

  @Get('getCurrentVersion/:pageId')
  public async getCurrentVersion(
    @Param('pageId') pageId: string,
  ): Promise<PageVersion> {
    const page = await this.pageService.getById(pageId);
    return page.pageVersions.find(version => version.isCurrent);
  }

  @Post('create')
  public async create(@Body() pageVersion: PageVersion): Promise<void> {
    if (pageVersion.pageId) {
      const page = await this.pageService.getById(pageVersion.pageId);
      if (!page) {
        throw new BadRequestException('the provided pageId is invalid');
      }
      const currentVersion = page.pageVersions.find(
        pageVersion => pageVersion.isCurrent,
      );
      await this.pageVersionService.setIsCurrent(currentVersion.id, false);
    } else {
      const page = await this.pageService.create();
      pageVersion.pageId = page.id;
    }
    pageVersion.isCurrent = true;
    await this.pageVersionService.create(pageVersion);
    return;
  }

  @Post('setCurrentVersion')
  public async setCurrentVersion(
    @Body('versionId') versionId: string,
  ): Promise<void> {
    if (!versionId) {
      throw new BadRequestException('versionId should not be empty');
    }
    const version = await this.pageVersionService.getById(versionId);
    if (!version) {
      throw new BadRequestException('the provided versionId was invalid');
    }
    const page = await this.pageService.getById(version.pageId);
    if (!page) {
      throw new BadRequestException('the provided versionId was invalid');
    }
    const currentVersion = page.pageVersions.find(
      pageVersion => pageVersion.isCurrent,
    );
    await this.pageVersionService.setIsCurrent(currentVersion.id, false);
    await this.pageVersionService.setIsCurrent(version.id, true);
    return;
  }
}
