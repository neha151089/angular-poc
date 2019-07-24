import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SharedService} from '../shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  loggedInUser: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedService: SharedService) {
  }

  ngOnInit() {
    console.log('ngOnInit() of Dashboard gets called!');
    this.loggedInUser = this.sharedService.getLoggedInUsername();
  }

  onProfileIconClick() {
    console.log('Dashboard componenet: profile icon clicked!');
  }

  onMyLearningsClick() {
    console.log('Dashboard component: my learnings clicked!');
    this.router.navigate(['my-learnings'], {relativeTo: this.activatedRoute});
  }

  onTopicsCoveredClick() {
    console.log('Dashboard component: topics covered clicked!');
    this.router.navigate(['topics-covered'], {relativeTo: this.activatedRoute});
  }

  onTopicsToExploreClick() {
    console.log('Dashboard component: topics to explore clicked!');
    this.router.navigate(['topics-to-explore'], {relativeTo: this.activatedRoute});
  }

  onReferencesClicked() {
    console.log('Dashboard component: references clicked!');
    this.router.navigate(['references'], {relativeTo: this.activatedRoute});
  }
}
