import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Difficulty } from './difficulty';
import { UserProgress } from './userProgress';


@Entity('user')
export class User {

    constructor(username:string, birthdate:Date, profilePictureURL:string)
{
    this.username=username;
    this.birthdate=birthdate;
    this.profilePictureURL=profilePictureURL;
    this.userProgress=new UserProgress(0,0,0,0);
}

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    birthdate: Date;

    @Column()
    profilePictureURL: string;

    @OneToOne(type=>UserProgress, userProgress=>userProgress.user)
    userProgress:UserProgress;
}