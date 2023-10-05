import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AppRootComponent } from './app-root.component';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {
}

describe('AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture<AppRootComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [AppRootComponent, RouterOutletStubComponent],
    });

    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component creation', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain router-outlet', () => {
      const routerOutletElement: DebugElement = fixture.debugElement.query(By.directive(RouterOutletStubComponent));
      expect(routerOutletElement.nativeElement).toBeTruthy();
    });
  });
});
