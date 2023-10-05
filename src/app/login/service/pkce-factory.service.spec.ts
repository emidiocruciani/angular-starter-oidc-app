import { TestBed } from '@angular/core/testing';

import { forkJoin, switchMap } from 'rxjs';

import { PkceFactoryService } from './pkce-factory.service';
import { Pkce } from '../model/pkce';

describe('PkceService', () => {
  let service: PkceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PkceFactoryService);
  });

  describe('make()', () => {

    it('should return an entity with a challenge and a verifier', (done: DoneFn) => {
      service.make()
        .subscribe((pkce: Pkce) => {
          expect(pkce.challenge).toBeTruthy();
          expect(pkce.verifier).toBeTruthy();

          done();
        });
    });
  });

  describe('validate()', () => {

    it('should return true when passing values from the same entity', (done: DoneFn) => {
      service.make()
        .pipe(
          switchMap((pkce: Pkce) =>
            service.validate(pkce.verifier, pkce.challenge)
          )
        )
        .subscribe((result: boolean) => {
          expect(result).toBeTrue();

          done();
        });
    });

    it('should return false when passing values from different entities', (done: DoneFn) => {
      const firstEntity = service.make();
      const secondEntity = service.make();

      forkJoin({ firstEntity, secondEntity })
        .pipe(
          switchMap(project =>
            service.validate(project.firstEntity.verifier, project.secondEntity.challenge)
          )
        )
        .subscribe((result: boolean) => {
          expect(result).toBeFalse();

          done();
        });
    });
  });
});
