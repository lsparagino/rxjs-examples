import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, interval, merge, Observable, Subject, Subscription} from 'rxjs';
import {ActionItem} from './models/ActionItem';
import {
  concatMap,
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'ls-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  mode$ = new BehaviorSubject<string>('switchMap');
  action$ = new Subject();
  reset$ = new Subject();
  runAction$ = new Subject<number>();

  selectedMode$: Observable<any>;
  clicks$: Observable<number>;

  actionItems: ActionItem[] = [];

  private count = -1;
  private actionSub = new Subscription();
  private duration = 1000;
  private interval = 100;

  constructor() {

    this.clicks$ = merge(
      this.action$.pipe(
        map(() => ++this.count),
        tap((id) => this.runAction$.next(id))
      ),
      this.reset$.pipe(
        tap(() => this.count = 0),
        tap(() => this.actionItems = []),
        map(() => this.count)
      )
    ).pipe(
      startWith(0)
    );

    this.selectedMode$ = this.mode$.pipe(
      filter((mode) => !!mode),
      distinctUntilChanged(),
      tap((mode) => this.reset$.next()),
      tap((mode) => {
        switch (mode) {
          case 'switchMap':
            this.switchMap();
            break;
          case 'mergeMap':
            this.mergeMap();
            break;
          case 'concatMap':
            this.concatMap();
            break;
          case 'exhaustMap':
            this.exhaustMap();
            break;
        }
      })
    );

  }

  ngOnInit(): void {
  }

  action(id: number) {
    const i: ActionItem = {
      id,
      progress: 0,
      completed: false
    };
    this.actionItems.unshift(i);

    return interval(this.interval).pipe(
      take(this.duration / this.interval),
      tap((count) => {
        i.progress = ((this.interval * (count + 1)) / this.duration) * 100;
      }),
      finalize(() => {
        i.completed = true;
      })
    )
  }

  switchMap() {
    this.actionSub.unsubscribe();
    this.actionSub = this.runAction$.pipe(
      switchMap((id) => this.action(id))
    ).subscribe();
  }

  mergeMap() {
    this.actionSub.unsubscribe();
    this.actionSub = this.runAction$.pipe(
      mergeMap((id) => this.action(id))
    ).subscribe();
  }

  concatMap() {
    this.actionSub.unsubscribe();
    this.actionSub = this.runAction$.pipe(
      concatMap((id) => this.action(id))
    ).subscribe();
  }

  exhaustMap() {
    this.actionSub.unsubscribe();
    this.actionSub = this.runAction$.pipe(
      exhaustMap((id) => this.action(id))
    ).subscribe();
  }

  trackById(index: number, item: ActionItem) {
    return item.id;
  }


}
