import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAthleteDto } from './dto/update-athlete.dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}
  create(createChallengeDto: CreateChallengeDto) {
    return this.prisma.challenge.create({ data: createChallengeDto });
  }

  findAll() {
    //return this.prisma.article.findMany({ where: { published: true } });
    return this.prisma.challenge.findMany({
      orderBy: [
        {
          end_date_local: 'desc',
        },
      ],
    });
  }

  findAllByClub(id:number,page:number=1){
    const challengesPerPage=3;  //up to 5
    return this.prisma.challenge.findMany({ 
      skip:challengesPerPage*(page-1),
      take:challengesPerPage,
      where: { club: {
      path: ['id'],
      equals: id,
    }, },
    orderBy: [
      {
        end_date_local: 'desc',
      }
    ] });
    /**
     * 
     */
  }
  async findAllByClubs(ids:string,page:string='1'){
    const _ids=ids.split(",")
    let result=[];
    for(let i=0;i<_ids.length;i++){
      const items=await this.findAllByClub(+_ids[i],+page);
      result=result.concat(...items);
    }
    return result;
  }


  findOne(id: number) {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  update(id: number, updateChallengeDto: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: { id },
      data: updateChallengeDto,
    });
  }

  remove(id: number) {
    return this.prisma.challenge.delete({ where: { id } });
  }

  async addAthleteToChallenge(id: number,updateAthleteDto:UpdateAthleteDto,clasification:boolean=false) {
    const challenteToBeUpdate = await this.prisma.challenge.findUnique({ where: { id } });
    let athletes = challenteToBeUpdate.athletes as any;
    console.log(athletes)
    if(Array.isArray(athletes)){
    for(let i=0;i<athletes.length;i++){
      if(athletes[i].id===updateAthleteDto.id){
        if(clasification){
          athletes[i]=updateAthleteDto;
          return this.prisma.challenge.update({
            where: { id },
            data: {
              athletes: athletes,
            },
          });
        }
        return challenteToBeUpdate;
      }
    }
  }else{
    athletes=[];
  }
  athletes.push(updateAthleteDto);
    return this.prisma.challenge.update({
      where: { id },
      data: {
        athletes: athletes,
      },
    });
  }

  async removeAthleteFromChallenge(id: number,updateAthleteDto:UpdateAthleteDto) {
    const challenteToBeUpdate = await this.prisma.challenge.findUnique({ where: { id } });
    let athletes = challenteToBeUpdate.athletes as any;
    if(Array.isArray(athletes)){
      for(let i=0;i<athletes.length;i++){
        if(athletes[i].id===updateAthleteDto.id){
          athletes.splice(i,1);
          break;
        }
      }
    }else{
      return challenteToBeUpdate;
    }
    return this.prisma.challenge.update({
      where: { id },
      data: {
        athletes:athletes
      },
    });
  }
}
