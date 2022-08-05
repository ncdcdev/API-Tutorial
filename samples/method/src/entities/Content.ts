import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('varchar')
  title: string

  @Column('varchar')
  body: string

  constructor(title: string, body: string) {
    this.title = title
    this.body = body
  }
}
