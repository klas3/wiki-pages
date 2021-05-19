import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PageVersion from './PageVersion';

@Entity()
class Page {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(
    () => PageVersion,
    pageVersion => pageVersion.page,
  )
  pageVersions!: PageVersion[];
}

export default Page;
