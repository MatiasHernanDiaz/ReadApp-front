import { of } from "rxjs"

export const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'post'])

httpClientSpy.get.withArgs('http://localhost:9000/recommendations').and.returnValue(of([]))
