import { IHomeService } from "../home.service";

export class MockHomeService implements IHomeService {
  getHelloString = jest.fn();
}
