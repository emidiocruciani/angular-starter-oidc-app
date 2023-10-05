import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BasePageComponent } from './base-page.component';

@Component({ selector: 'app-navbar', template: '' })
class NavbarStubComponent {
}

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {
}

describe('BasePublicPageComponent', () => {
  let component: BasePageComponent;
  let fixture: ComponentFixture<BasePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        BasePageComponent, 
        NavbarStubComponent, 
        RouterOutletStubComponent,
      ]
    });

    fixture = TestBed.createComponent(BasePageComponent);
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

    it('should contain app-navbar', () => {
      const navbarElement: DebugElement = fixture.debugElement.query(By.directive(NavbarStubComponent));
      expect(navbarElement.nativeElement).toBeTruthy();
    });
  });
});
