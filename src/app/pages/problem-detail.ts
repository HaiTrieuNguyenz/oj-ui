import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SubmissionService } from '../services/submission.service';
import { Submission } from '../models/submission.model';

@Component({
  selector: 'app-problem-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen">
      <div class="flex h-screen flex-col lg:flex-row">
        <!-- Problem Description -->
        <div class="flex-1 overflow-y-auto border-r border-slate-200 p-6 lg:p-8">
          <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900">{{ problemTitle }}</h1>
                  <p class="text-slate-600 mt-2">Difficulty: <span [ngClass]="getDifficultyClass(difficulty)" class="badge">{{ difficulty }}</span></p>
                </div>
                <div class="flex gap-2">
                  <button class="btn-ghost text-sm">❤️ {{ likes }}</button>
                  <button class="btn-ghost text-sm">👎 {{ dislikes }}</button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="prose prose-sm max-w-none mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Description</h2>
              <p class="text-slate-700 leading-relaxed mb-4">
                Given an array of integers <code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono">nums</code> and an integer <code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono">target</code>, return the indices of the two numbers that add up to the target.
              </p>
              <p class="text-slate-700 leading-relaxed mb-4">
                You may assume that each input would have exactly one solution, and you may not use the same element twice.
              </p>
              <p class="text-slate-700 leading-relaxed">
                You can return the answer in any order.
              </p>
            </div>

            <!-- Examples -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Examples</h2>
              <div class="space-y-6">
                <div class="bg-white border border-slate-200 rounded-lg p-6">
                  <p class="font-semibold text-slate-900 mb-3">Example 1:</p>
                  <div class="bg-slate-50 p-4 rounded font-mono text-sm space-y-1 mb-3">
                    <div>Input: nums = [2,7,11,15], target = 9</div>
                    <div>Output: [0,1]</div>
                    <div>Explanation: nums[0] + nums[1] == 9, we return [0, 1].</div>
                  </div>
                </div>

                <div class="bg-white border border-slate-200 rounded-lg p-6">
                  <p class="font-semibold text-slate-900 mb-3">Example 2:</p>
                  <div class="bg-slate-50 p-4 rounded font-mono text-sm space-y-1">
                    <div>Input: nums = [3,2,4], target = 6</div>
                    <div>Output: [1,2]</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Constraints -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-4">Constraints</h2>
              <ul class="list-disc list-inside space-y-2 text-slate-700">
                <li>2 ≤ nums.length ≤ 10<sup>4</sup></li>
                <li>-10<sup>9</sup> ≤ nums[i] ≤ 10<sup>9</sup></li>
                <li>-10<sup>9</sup> ≤ target ≤ 10<sup>9</sup></li>
                <li>Only one valid answer exists.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Code Editor & Submissions -->
        <div class="flex-1 flex flex-col bg-white">
          <!-- Tabs -->
          <div class="border-b border-slate-200">
            <div class="flex items-center">
              <button
                (click)="activeTab = 'code'"
                [class.border-b-2]="activeTab === 'code'"
                [class.border-primary-600]="activeTab === 'code'"
                [class.text-primary-600]="activeTab === 'code'"
                [class.text-slate-600]="activeTab !== 'code'"
                class="px-6 py-4 font-semibold hover:text-slate-900 transition-colors"
              >
                Code
              </button>
              <button
                (click)="activeTab = 'submissions'"
                [class.border-b-2]="activeTab === 'submissions'"
                [class.border-primary-600]="activeTab === 'submissions'"
                [class.text-primary-600]="activeTab === 'submissions'"
                [class.text-slate-600]="activeTab !== 'submissions'"
                class="px-6 py-4 font-semibold hover:text-slate-900 transition-colors"
              >
                Submissions ({{ submissions.length }})
              </button>
            </div>
          </div>

          <!-- Code Tab -->
          <div *ngIf="activeTab === 'code'" class="flex-1 flex flex-col overflow-hidden p-6">
            <div class="mb-4">
              <label class="block text-sm font-medium text-slate-700 mb-2">Language</label>
              <select [(ngModel)]="selectedLanguage" class="input-field max-w-xs">
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>Go</option>
              </select>
            </div>

            <!-- Code Editor -->
            <div class="flex-1 bg-slate-900 rounded-lg overflow-hidden flex flex-col">
              <textarea
                [(ngModel)]="code"
                class="flex-1 bg-slate-900 text-slate-100 font-mono p-4 resize-none focus:outline-none"
                placeholder="// Enter your code here..."
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex gap-4">
              <button class="btn-primary flex-1">
                Submit
              </button>
              <button class="btn-secondary">
                Run
              </button>
              <button class="btn-ghost">
                Reset
              </button>
            </div>
          </div>

          <!-- Submissions Tab -->
          <div *ngIf="activeTab === 'submissions'" class="flex-1 overflow-y-auto p-6">
            <div class="space-y-4">
              <div *ngIf="submissions.length === 0" class="text-center py-12">
                <p class="text-slate-600 text-lg">No submissions yet for this problem.</p>
                <p class="text-slate-500 mt-2">Submit your solution to see it appear here.</p>
              </div>

              <div *ngFor="let submission of submissions" class="card p-4 hover:shadow-lg transition-all cursor-pointer">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span [ngClass]="getStatusBadgeClass(submission.status)" class="badge text-xs font-bold px-2.5 py-1">
                        {{ submission.status }}
                      </span>
                      <span class="text-xs font-mono text-slate-500">{{ submission.language }}</span>
                      <span class="text-xs text-slate-500">{{ formatDate(submission.timestamp) }}</span>
                    </div>
                    <p class="text-xs text-slate-600">{{ submission.userName }}</p>
                  </div>
                  <div class="text-right">
                    <div *ngIf="submission.status === 'Accepted'" class="text-xs font-semibold text-success-700">
                      {{ submission.runtime }}ms / {{ submission.memory }}MB
                    </div>
                    <div *ngIf="submission.status !== 'Accepted'" class="text-xs text-slate-600">
                      {{ submission.testsPassed }}/{{ submission.totalTests }} passed
                    </div>
                  </div>
                </div>

                <!-- Code Preview -->
                <div class="bg-slate-900 rounded text-slate-100 font-mono text-xs p-3 mb-3 max-h-32 overflow-hidden">
                  <pre class="text-slate-300" [textContent]="submission.codeSnippet.substring(0, 150) + (submission.codeSnippet.length > 150 ? '...' : '')"></pre>
                </div>

                <!-- Stats -->
                <div class="flex gap-4 text-xs text-slate-600">
                  <div>✓ Tests: {{ submission.testsPassed }}/{{ submission.totalTests }}</div>
                  <div *ngIf="submission.runtime > 0">⚡ Runtime: {{ submission.runtime }}ms</div>
                  <div *ngIf="submission.memory > 0">💾 Memory: {{ submission.memory }}MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .prose code {
        @apply bg-slate-100 px-2 py-1 rounded text-sm font-mono;
      }

      textarea {
        font-family: "Fira Code", monospace;
        line-height: 1.6;
        tab-size: 2;
      }
    `,
  ],
})
export class ProblemDetailComponent implements OnInit {
  problemId: number | null = null;
  problemTitle = 'Two Sum';
  difficulty = 'Easy';
  likes = 2345;
  dislikes = 234;
  selectedLanguage = 'JavaScript';
  code = `function twoSum(nums, target) {
  // Your code here
  return [];
}`;
  activeTab: 'code' | 'submissions' = 'code';
  submissions: Submission[] = [];

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.problemId = +params['id'];
      if (this.problemId) {
        this.loadSubmissions(this.problemId);
      }
    });
  }

  loadSubmissions(problemId: number): void {
    this.submissionService.getSubmissionsByProblemId(problemId).subscribe((submissions) => {
      this.submissions = submissions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    });
  }

  getDifficultyClass(difficulty: string): string {
    const classes: Record<string, string> = {
      Easy: 'badge-success',
      Medium: 'badge-warning',
      Hard: 'badge-danger',
    };
    return classes[difficulty] || 'badge-primary';
  }

  getStatusBadgeClass(status: string): string {
    const classes: Record<string, string> = {
      Accepted: 'badge-success',
      'Wrong Answer': 'badge-danger',
      'Time Limit Exceeded': 'badge-warning',
      'Runtime Error': 'badge-danger',
      'Compilation Error': 'badge-danger',
      'Memory Limit Exceeded': 'badge-warning',
    };
    return classes[status] || 'badge-primary';
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }
}
