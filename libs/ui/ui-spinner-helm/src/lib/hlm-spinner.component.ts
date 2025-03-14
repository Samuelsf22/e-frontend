import { Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const spinnerVariants = cva('inline-block', {
  variants: {
    variant: {
      default: 'text-primary fill-accent',
    },
    size: {
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      default: 'w-8 h-8 ',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
export type SpinnerVariants = VariantProps<typeof spinnerVariants>;

@Component({
  selector: 'hlm-spinner',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
    role: 'status',
  },
  template: `
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="4" width="6" height="14" opacity="1">
        <animate
          id="spinner_aqiq"
          begin="0;spinner_xVBj.end-0.25s"
          attributeName="y"
          dur="0.75s"
          values="1;5"
          fill="freeze"
        />
        <animate
          begin="0;spinner_xVBj.end-0.25s"
          attributeName="height"
          dur="0.75s"
          values="22;14"
          fill="freeze"
        />
        <animate
          begin="0;spinner_xVBj.end-0.25s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
      <rect x="9" y="4" width="6" height="14" opacity=".4">
        <animate
          begin="spinner_aqiq.begin+0.15s"
          attributeName="y"
          dur="0.75s"
          values="1;5"
          fill="freeze"
        />
        <animate
          begin="spinner_aqiq.begin+0.15s"
          attributeName="height"
          dur="0.75s"
          values="22;14"
          fill="freeze"
        />
        <animate
          begin="spinner_aqiq.begin+0.15s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
      <rect x="17" y="4" width="6" height="14" opacity=".3">
        <animate
          id="spinner_xVBj"
          begin="spinner_aqiq.begin+0.3s"
          attributeName="y"
          dur="0.75s"
          values="1;5"
          fill="freeze"
        />
        <animate
          begin="spinner_aqiq.begin+0.3s"
          attributeName="height"
          dur="0.75s"
          values="22;14"
          fill="freeze"
        />
        <animate
          begin="spinner_aqiq.begin+0.3s"
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </rect>
    </svg>
    <span class="sr-only"><ng-content /></span>
  `,
})
export class HlmSpinnerComponent {
  public readonly size = input<SpinnerVariants['size']>('default');
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    hlm(spinnerVariants({ size: this.size() }), this.userClass())
  );
}
