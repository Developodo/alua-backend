import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';


import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeEntity } from './entities/challenge.entity';
import { UpdateAthleteDto } from './dto/update-athlete.dto';



@Controller('challenges')
@ApiTags('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @ApiCreatedResponse({ type: ChallengeEntity })
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Get()
  @ApiOkResponse({ type: ChallengeEntity, isArray: true })
  findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ChallengeEntity })
  findOne(@Param('id') id: string) {
    return this.challengesService.findOne(+id);
  }

  @Get('/club/:id')
  @ApiOkResponse({ type: ChallengeEntity, isArray: true  })
  findByClub(@Param('id') id: string) {
    return this.challengesService.findAllByClub(+id);
  }


  @Get('/clubs/:id')
  @ApiOkResponse({ type: ChallengeEntity, isArray: true  })
  findByClubsFirstPage(@Param('id') id: string) {
    return this.challengesService.findAllByClubs(id);
  }

  @Get('/clubs/:id/page/:page')
  @ApiOkResponse({ type: ChallengeEntity, isArray: true  })
  findByClubs(@Param('id') id: string,@Param('page') page: string) {
    return this.challengesService.findAllByClubs(id,page);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ChallengeEntity })
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto) {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Patch('/subscribe/:id')
  @ApiOkResponse({ type: ChallengeEntity })
  subscribe(@Param('id') id: string, @Body() subscribeAthleteDto: UpdateAthleteDto) {
    return this.challengesService.addAthleteToChallenge(+id, subscribeAthleteDto);
  }

  @Patch('/unsubscribe/:id')
  @ApiOkResponse({ type: ChallengeEntity })
  unsubscribe(@Param('id') id: string, @Body() subscribeAthleteDto: UpdateAthleteDto) {
    return this.challengesService.removeAthleteFromChallenge(+id, subscribeAthleteDto);
  }

  @Patch('/clasification/:id')
  @ApiOkResponse({ type: ChallengeEntity })
  clasification(@Param('id') id: string, @Body() subscribeAthleteDto: UpdateAthleteDto) {
    return this.challengesService.addAthleteToChallenge(+id, subscribeAthleteDto,true);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ChallengeEntity })
  remove(@Param('id') id: string) {
    return this.challengesService.remove(+id);
  }
}
