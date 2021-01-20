import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { VoteService } from '../vote.service';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  // isLoggedIn: boolean;
  
  constructor(private voteService: VoteService, private postService: PostService, 
    private toastr: ToastrService) {
        this.votePayload = {
            voteType: undefined,
            postId: undefined
        }
        //this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  // Lưu Vote vào csdl
  private vote() {
    this.votePayload.postId = this.post.id;    //id của bài post ta click
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
      this.toastr.success('Vote Successful');
    }, error => {
      // this.toastr.error(error.error.message);  //Backend ko hiện message
      this.toastr.error('Vote Failed');
      throwError(error);
    });
  }
  
  // Nhận về tất cả bài Post theo id
  // Truyền vào this.postVote.id => Nhận về tất cả bài Post theo id 
  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
