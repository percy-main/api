import { Test, TestingModule } from "@nestjs/testing";
import { CONFIG } from "../../lib/config";
import { HomeService } from "../home.service";

describe("HomeService", () => {
  let service: HomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HomeService,
        {
          provide: CONFIG,
          useValue: { greeting: "Hola world" },
        },
      ],
    }).compile();

    service = module.get<HomeService>(HomeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
