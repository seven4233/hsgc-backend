import { User } from '../..//user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Moment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column('varchar', { nullable: true })
  title: string;

  @Column('varchar', { nullable: true })
  content: string;

  /**
   * 状态 status
   */
  @Column('tinyint', { default:0})
  status: number;

  /**
   * 发布者id owner
   */
  @Column('bigint') 
  ownerId: number; 

  @ManyToOne(()=>User) 
  user: User; 

  /**

  /**
   *  收藏数量 start
   */
  @Column('int', { default: 0 })
  star: number;
  /**
   *  点赞数量 like
   */
  @Column('int', { default: 0 })
  like: number;

  /**
   *  评论数量 like
   */
  @Column('int', { default: 0 })
  message: number;


  @CreateDateColumn({type:'datetime'})
  createdAt: Date;

  @UpdateDateColumn({type:'datetime'})
  updatedAt: Date;

  @DeleteDateColumn({type:'datetime'})
  deletedAt: Date;
}
