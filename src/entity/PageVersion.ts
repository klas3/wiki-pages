import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Page from './Page';

@Entity()
class PageVersion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  @IsNotEmpty()
  title!: string;

  @Column()
  @IsNotEmpty()
  text!: string;

  @Column()
  isCurrent: boolean;

  @Column()
  pageId: string;

  @ManyToOne(
    () => Page,
    page => page.pageVersions,
  )
  page!: Page;
}

export default PageVersion;
