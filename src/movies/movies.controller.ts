import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Body,
  Query,
} from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll() {
    return "return all movies";
  }

  @Get("search")
  searchMovie(@Query("year") searchingYear: string) {
    return `search ${searchingYear}`;
  }

  @Get(":id")
  getOne(@Param("id") movieId: string) {
    return `return id ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return `${movieData}`;
  }

  @Patch(":id")
  patch(@Param("id") movieId: string, @Body() updateData) {
    return `path ${movieId} ${updateData}`;
  }

  @Delete(":id")
  deleteMovie(@Param("id") movieId: string) {
    return `delete ${movieId}`;
  }
}
