import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Page from '../entity/Page';
import PageVersion from '../entity/PageVersion';
import { PageVersionService } from './page-version.service';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page, PageVersion])],
  controllers: [PageController],
  providers: [PageService, PageVersionService],
  exports: [PageService, PageVersionService],
})
export class PageModule {}
