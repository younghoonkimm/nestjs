import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { NotFoundException } from "@nestjs/common";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("shoul return an array", () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("shoul return an array", () => {
      service.create({
        title: "this movie",
        year: 2021,
        genres: ["horror"],
      });

      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("nothing  404", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        // expect(e.message).toEqual("movie with id not ound");
      }
    });
  });

  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title: "this movie",
        year: 2021,
        genres: ["horror"],
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("should return a 404", () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("create", () => {
    it("createMoive", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "this movie",
        year: 2021,
        genres: ["horror"],
      });

      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("update", () => {
    it("update movie", () => {
      service.create({
        title: "this movie",
        year: 2021,
        genres: ["horror"],
      });
      service.update(1, { title: "update" });
      const movie = service.getOne(1);
      expect(movie.title).toEqual("update");
    });
  });
});
