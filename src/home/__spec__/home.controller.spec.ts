import { Test, TestingModule } from "@nestjs/testing";
import { HomeController } from "../home.controller";
import { IHomeService } from "../home.service";
import { MockHomeService } from "./home.service.mock";

describe("HomeController", () => {
  let controller: HomeController;

  let homeService: IHomeService;

  beforeEach(async () => {
    homeService = new MockHomeService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeController],
      providers: [{ provide: IHomeService, useValue: homeService }],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
