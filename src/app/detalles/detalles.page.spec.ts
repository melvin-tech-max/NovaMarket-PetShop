import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPage } from './detalles.page';
import { describe, beforeEach, it, expect } from 'vitest';

describe('DetallesPage', () => {
  let component: DetallesPage;
  let fixture: ComponentFixture<DetallesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});