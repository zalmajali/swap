import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LatestversionPage } from './latestversion.page';

describe('LatestversionPage', () => {
  let component: LatestversionPage;
  let fixture: ComponentFixture<LatestversionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LatestversionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
