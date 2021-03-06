import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.JhipsterSampleAppProductModule),
      },
      {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.JhipsterSampleAppBoardModule),
      },
      {
        path: 'notice',
        loadChildren: () => import('./notice/notice.module').then(m => m.JhipsterSampleAppNoticeModule),
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.JhipsterSampleAppStudentModule),
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.JhipsterSampleAppAuthorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterSampleAppEntityModule {}
