import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SubmissionService } from "../services/submission.service";
import { Submission } from "../models/submission.model";

@Component({
  selector: "app-problem-detail",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen">
      <div class="flex h-screen flex-col lg:flex-row">
        <!-- Problem Description -->
        <div
          class="flex-1 overflow-y-auto border-r border-slate-200 p-6 lg:p-8"
        >
          <div class="max-w-3xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900">
                    {{ problemTitle }}
                  </h1>
                  <p class="text-slate-600 mt-2">
                    Difficulty:
                    <span
                      [ngClass]="getDifficultyClass(difficulty)"
                      class="badge"
                      >{{ difficulty }}</span
                    >
                  </p>
                </div>
                <div class="flex gap-2">
                  <button class="btn-ghost text-sm">❤️ {{ likes }}</button>
                  <button class="btn-ghost text-sm">👎 {{ dislikes }}</button>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="prose prose-sm max-w-none mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-4">
                Description
              </h2>
              <p class="text-slate-700 leading-relaxed mb-4">
                Given an array of integers
                <code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono"
                  >nums</code
                >
                and an integer
                <code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono"
                  >target</code
                >, return the indices of the two numbers that add up to the
                target.
              </p>
              <p class="text-slate-700 leading-relaxed mb-4">
                You may assume that each input would have exactly one solution,
                and you may not use the same element twice.
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
                  <div
                    class="bg-slate-50 p-4 rounded font-mono text-sm space-y-1 mb-3"
                  >
                    <div>Input: nums = [2,7,11,15], target = 9</div>
                    <div>Output: [0,1]</div>
                    <div>
                      Explanation: nums[0] + nums[1] == 9, we return [0, 1].
                    </div>
                  </div>
                </div>

                <div class="bg-white border border-slate-200 rounded-lg p-6">
                  <p class="font-semibold text-slate-900 mb-3">Example 2:</p>
                  <div
                    class="bg-slate-50 p-4 rounded font-mono text-sm space-y-1"
                  >
                    <div>Input: nums = [3,2,4], target = 6</div>
                    <div>Output: [1,2]</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Constraints -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-4">
                Constraints
              </h2>
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
              <button
                (click)="activeTab = 'solution'"
                [class.border-b-2]="activeTab === 'solution'"
                [class.border-primary-600]="activeTab === 'solution'"
                [class.text-primary-600]="activeTab === 'solution'"
                [class.text-slate-600]="activeTab !== 'solution'"
                class="px-6 py-4 font-semibold hover:text-slate-900 transition-colors"
              >
                Solution
              </button>
              <button
                (click)="activeTab = 'discussion'"
                [class.border-b-2]="activeTab === 'discussion'"
                [class.border-primary-600]="activeTab === 'discussion'"
                [class.text-primary-600]="activeTab === 'discussion'"
                [class.text-slate-600]="activeTab !== 'discussion'"
                class="px-6 py-4 font-semibold hover:text-slate-900 transition-colors"
              >
                Discussion
              </button>
            </div>
          </div>

          <!-- Code Tab -->
          <div
            *ngIf="activeTab === 'code'"
            class="flex-1 flex flex-col overflow-hidden p-6"
          >
            <div class="mb-4">
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Language</label
              >
              <select
                [(ngModel)]="selectedLanguage"
                class="input-field max-w-xs"
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>Go</option>
              </select>
            </div>

            <!-- Code Editor -->
            <div
              class="flex-1 bg-slate-900 rounded-lg overflow-hidden flex flex-col"
            >
              <textarea
                [(ngModel)]="code"
                class="flex-1 bg-slate-900 text-slate-100 font-mono p-4 resize-none focus:outline-none"
                placeholder="// Enter your code here..."
              ></textarea>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex gap-4">
              <button class="btn-primary flex-1">Submit</button>
              <button class="btn-secondary">Run</button>
              <button class="btn-ghost">Reset</button>
            </div>
          </div>

          <!-- Submissions Tab -->
          <div
            *ngIf="activeTab === 'submissions'"
            class="flex-1 overflow-y-auto p-6"
          >
            <div class="space-y-4">
              <div *ngIf="submissions.length === 0" class="text-center py-12">
                <p class="text-slate-600 text-lg">
                  No submissions yet for this problem.
                </p>
                <p class="text-slate-500 mt-2">
                  Submit your solution to see it appear here.
                </p>
              </div>

              <div
                *ngFor="let submission of submissions"
                class="card p-6 hover:shadow-lg transition-all border-2 border-slate-200 hover:border-primary-300"
              >
                <!-- Header Row -->
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span
                        [ngClass]="getStatusBadgeClass(submission.status)"
                        class="badge text-xs font-bold px-3 py-1"
                      >
                        {{ submission.status }}
                      </span>
                      <span
                        class="text-xs font-mono font-semibold text-slate-700"
                        >{{ submission.language }}</span
                      >
                      <span class="text-xs text-slate-500">{{
                        formatDate(submission.timestamp)
                      }}</span>
                    </div>
                    <p class="text-xs font-medium text-slate-600">
                      {{ submission.userName }}
                    </p>
                  </div>
                  <div class="text-right">
                    <div
                      *ngIf="submission.status === 'Accepted'"
                      class="text-xs font-semibold text-success-700"
                    >
                      {{ submission.runtime }}ms / {{ submission.memory }}MB
                    </div>
                    <div
                      *ngIf="submission.status !== 'Accepted'"
                      class="text-xs text-slate-600"
                    >
                      {{ submission.testsPassed }}/{{
                        submission.totalTests
                      }}
                      passed
                    </div>
                  </div>
                </div>

                <!-- Stats Row -->
                <div
                  class="flex gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-200"
                >
                  <div>
                    ✓ Tests: {{ submission.testsPassed }}/{{
                      submission.totalTests
                    }}
                  </div>
                  <div *ngIf="submission.runtime > 0">
                    ⚡ Runtime: {{ submission.runtime }}ms
                  </div>
                  <div *ngIf="submission.memory > 0">
                    💾 Memory: {{ submission.memory }}MB
                  </div>
                </div>

                <!-- View Code Button -->
                <button
                  (click)="
                    expandedSubmissionId =
                      expandedSubmissionId === submission.id
                        ? null
                        : submission.id
                  "
                  class="btn-secondary text-sm w-full mb-4"
                >
                  {{
                    expandedSubmissionId === submission.id
                      ? "Hide Code"
                      : "View Code"
                  }}
                </button>

                <!-- Code Preview (Hidden by default) -->
                <div
                  *ngIf="expandedSubmissionId === submission.id"
                  class="bg-slate-900 rounded-lg text-slate-100 font-mono text-xs p-4 max-h-64 overflow-y-auto"
                >
                  <pre
                    class="text-slate-300"
                    [textContent]="submission.codeSnippet"
                  ></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Solution Tab -->
          <div
            *ngIf="activeTab === 'solution'"
            class="flex-1 overflow-y-auto p-6"
          >
            <div class="space-y-8">
              <div *ngFor="let solution of solutions" class="card p-6">
                <h3 class="text-xl font-bold text-slate-900 mb-3">
                  {{ solution.title }}
                </h3>
                <div class="flex items-center gap-4 mb-4">
                  <span class="badge" [ngClass]="solution.complexity.timeClass"
                    >Time: {{ solution.complexity.time }}</span
                  >
                  <span
                    class="badge"
                    [ngClass]="solution.complexity.spaceClass"
                    >Space: {{ solution.complexity.space }}</span
                  >
                </div>
                <div
                  class="prose prose-sm max-w-none"
                  [innerHTML]="solution.explanation"
                ></div>
                <div class="mt-4 bg-slate-900 rounded-lg">
                  <pre
                    class="text-slate-300 font-mono text-xs p-4"
                  ><code [innerHTML]="solution.code"></code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Discussion Tab -->
          <div
            *ngIf="activeTab === 'discussion'"
            class="flex-1 overflow-y-auto p-6"
          >
            <!-- Discussion Rules -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 class="text-lg font-bold text-blue-900 mb-2">
                Discussion Rules
              </h3>
              <ul class="list-disc list-inside text-blue-800 text-sm space-y-2">
                <li>
                  Be respectful and constructive. No personal attacks or
                  trolling.
                </li>
                <li>
                  Do not post solutions in the discussion. Use the "Solution"
                  tab instead.
                </li>
                <li>
                  Keep discussions focused on the problem. Ask clarifying
                  questions, discuss edge cases, or share alternative
                  approaches.
                </li>
                <li>
                  Use code formatting for any small snippets of code you share.
                </li>
              </ul>
            </div>

            <!-- Post a Comment -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-slate-900 mb-4">
                Post a Comment
              </h3>
              <textarea
                [(ngModel)]="newCommentText"
                class="input-field w-full"
                rows="4"
                placeholder="Share your thoughts on this problem..."
              ></textarea>
              <div class="text-right mt-4">
                <button class="btn-primary">Post Comment</button>
              </div>
            </div>

            <!-- Comments List -->
            <div class="space-y-6">
              <div
                *ngFor="let comment of comments"
                class="bg-white border border-slate-200 rounded-lg p-6"
              >
                <div class="flex items-start gap-4">
                  <img
                    [src]="comment.avatar"
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <div>
                        <span class="font-bold text-slate-900">{{
                          comment.username
                        }}</span>
                        <span class="text-sm text-slate-500 ml-2">{{
                          formatDate(comment.timestamp)
                        }}</span>
                      </div>
                      <button class="btn-ghost text-sm">Reply</button>
                    </div>
                    <p class="text-slate-700 mt-2">{{ comment.text }}</p>

                    <!-- Replies -->
                    <div class="mt-4">
                      <button
                        *ngIf="comment.replies.length > 0 && !comment.showReplies"
                        (click)="comment.showReplies = true"
                        class="btn-secondary text-sm"
                      >
                        Show {{ comment.replies.length }} replies
                      </button>
                      <button
                        *ngIf="comment.showReplies"
                        (click)="comment.showReplies = false"
                        class="btn-secondary text-sm"
                      >
                        Hide replies
                      </button>

                      <div *ngIf="comment.showReplies" class="mt-4 space-y-4">
                        <div
                          *ngFor="let reply of comment.replies"
                          class="flex items-start gap-4"
                        >
                          <img
                            [src]="reply.avatar"
                            class="w-8 h-8 rounded-full"
                          />
                          <div class="flex-1">
                            <div class="flex items-center justify-between">
                              <div>
                                <span class="font-bold text-slate-900">{{
                                  reply.username
                                }}</span>
                                <span class="text-sm text-slate-500 ml-2">{{
                                  formatDate(reply.timestamp)
                                }}</span>
                              </div>
                            </div>
                            <p class="text-slate-700 mt-1">
                              {{ reply.text }}
                            </p>
                          </div>
                        </div>
                        <!-- Reply Form -->
                        <div class="flex items-start gap-4">
                          <img
                            src="https://i.pravatar.cc/150?u=currentUser"
                            class="w-8 h-8 rounded-full"
                          />
                          <div class="flex-1">
                            <textarea
                              class="input-field w-full"
                              rows="2"
                              placeholder="Write a reply..."
                            ></textarea>
                            <div class="text-right mt-2">
                              <button class="btn-primary text-sm">
                                Post Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
  problemTitle = "Two Sum";
  difficulty = "Easy";
  likes = 2345;
  dislikes = 234;
  selectedLanguage = "JavaScript";
  code = `function twoSum(nums, target) {
  // Your code here
  return [];
}`;
  activeTab: "code" | "submissions" | "solution" | "discussion" = "code";
  submissions: Submission[] = [];
  expandedSubmissionId: number | null = null;
  newCommentText = "";

  solutions = [
    {
      title: "Brute Force Approach",
      complexity: {
        time: "O(n^2)",
        space: "O(1)",
        timeClass: "badge-danger",
        spaceClass: "badge-success",
      },
      explanation: `<p>The most straightforward solution is to iterate through each element <code>x</code> and then iterate through the rest of the array to find an element <code>y</code> such that <code>x + y = target</code>.</p><p>This involves a nested loop, where the outer loop runs from the first element to the second-to-last, and the inner loop runs from the next element to the last.</p>`,
      code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
    },
    {
      title: "Two-Pass Hash Table",
      complexity: {
        time: "O(n)",
        space: "O(n)",
        timeClass: "badge-warning",
        spaceClass: "badge-warning",
      },
      explanation: `<p>To improve the runtime, we can use a hash table (like a JavaScript <code>Map</code> or <code>Object</code>). We can trade space for speed.</p><p>The idea is to iterate through the array twice. In the first pass, we add each element's value and its index to the hash table. In the second pass, for each element, we check if its complement (<code>target - nums[i]</code>) exists in the hash table. If it does, and it's not the same element, we have our solution.</p>`,
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement) && map.get(complement) !== i) {
      return [i, map.get(complement)];
    }
  }
  return [];
}`,
    },
    {
      title: "One-Pass Hash Table (Optimal)",
      complexity: {
        time: "O(n)",
        space: "O(n)",
        timeClass: "badge-success",
        spaceClass: "badge-warning",
      },
      explanation: `<p>We can optimize the hash table approach by doing it in a single pass. While we iterate and insert elements into the hash table, we also look back to check if the current element's complement already exists in the table.</p><p>If it exists, we have found a solution and can return immediately. This is the most optimal approach in terms of time complexity.</p>`,
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    },
  ];

  comments = [
    {
      id: 1,
      username: "CuriousCoder",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      timestamp: new Date("2025-11-27T14:00:00Z"),
      text: "I was wondering about the constraints. If the input array could contain duplicates, how would that change the problem?",
      replies: [],
      showReplies: false,
    },
    {
      id: 2,
      username: "DataWizard",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
      timestamp: new Date("2025-11-26T18:30:00Z"),
      text: "The one-pass hash table solution is brilliant! It's amazing how a simple data structure can improve the time complexity so dramatically.",
      replies: [
        {
          id: 3,
          username: "CodeNewbie",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
          timestamp: new Date("2025-11-26T19:00:00Z"),
          text: "I agree! I was stuck on the O(n^2) solution for a while. This is a great example of space-time tradeoff.",
        },
        {
          id: 4,
          username: "AlgoExpert",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
          timestamp: new Date("2025-11-27T09:15:00Z"),
          text: "Exactly. It's a classic pattern for 'find a pair' problems. Always think about hash maps when you see one!",
        },
        {
          id: 5,
          username: "DataWizard",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
          timestamp: new Date("2025-11-27T09:30:00Z"),
          text: "Good point. I'll remember that for future problems. Thanks!",
        },
      ],
      showReplies: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.problemId = +params["id"];
      if (this.problemId) {
        this.loadSubmissions(this.problemId);
      }
    });
  }

  loadSubmissions(problemId: number): void {
    this.submissionService
      .getSubmissionsByProblemId(problemId)
      .subscribe((submissions) => {
        this.submissions = submissions.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
        );
      });
  }

  getDifficultyClass(difficulty: string): string {
    const classes: Record<string, string> = {
      Easy: "badge-success",
      Medium: "badge-warning",
      Hard: "badge-danger",
    };
    return classes[difficulty] || "badge-primary";
  }

  getStatusBadgeClass(status: string): string {
    const classes: Record<string, string> = {
      Accepted: "badge-success",
      "Wrong Answer": "badge-danger",
      "Time Limit Exceeded": "badge-warning",
      "Runtime Error": "badge-danger",
      "Compilation Error": "badge-danger",
      "Memory Limit Exceeded": "badge-warning",
    };
    return classes[status] || "badge-primary";
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }
}
