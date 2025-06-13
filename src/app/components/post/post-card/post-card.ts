import { Component } from '@angular/core';
import { PostHeader } from '../post-header/post-header';
import { PostBody } from '../post-body/post-body';
import { PostActions } from '../post-actions/post-actions';

@Component({
  selector: 'app-post-card',
  imports: [PostHeader, PostBody, PostActions],
  templateUrl: './post-card.html',
  styles: '',
})
export class PostCard {}
