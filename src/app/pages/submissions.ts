import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SubmissionService } from "../services/submission.service";
import { Submission } from "../models/submission.model";

@Component({
  selector: "app-submissions",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-8">
      <div class="container-max">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">My Submissions</h1>
          <p class="text-lg text-slate-600">
            Track all your submissions and their results
          </p>
        </div>

        <!-- Filters & Search -->
        <div class="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Problem</label
              >
              <input
                [(ngModel)]="searchQuery"
                type="text"
                placeholder="Search problems..."
                class="input-field"
              />
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Status</label
              >
              <select [(ngModel)]="selectedStatus" class="input-field">
                <option value="">All Status</option>
                <option value="Accepted">Accepted</option>
                <option value="Wrong Answer">Wrong Answer</option>
                <option value="Time Limit Exceeded">Time Limit Exceeded</option>
                <option value="Runtime Error">Runtime Error</option>
                <option value="Compilation Error">Compilation Error</option>
                <option value="Memory Limit Exceeded">
                  Memory Limit Exceeded
                </option>
              </select>
            </div>

            <!-- Language Filter -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Language</label
              >
              <select [(ngModel)]="selectedLanguage" class="input-field">
                <option value="">All Languages</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="Go">Go</option>
              </select>
            </div>

            <!-- Sort -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Sort</label
              >
              <select [(ngModel)]="sortBy" class="input-field">
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="runtime">Fastest Runtime</option>
                <option value="memory">Lowest Memory</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-success-600">
              {{ acceptedCount }}
            </div>
            <p class="text-slate-600 mt-2">Accepted</p>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-danger-600">
              {{ wrongAnswerCount }}
            </div>
            <p class="text-slate-600 mt-2">Wrong Answer</p>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-warning-600">
              {{ tleCoutt }}
            </div>
            <p class="text-slate-600 mt-2">Time Limit Exceeded</p>
          </div>
          <div class="card p-6 text-center">
            <div class="text-3xl font-bold text-slate-600">
              {{ filteredSubmissions.length }}
            </div>
            <p class="text-slate-600 mt-2">Total Submissions</p>
          </div>
        </div>

        <!-- Submissions List -->
        <div class="space-y-4">
          <div
            *ngIf="filteredSubmissions.length === 0"
            class="card p-12 text-center"
          >
            <p class="text-slate-600 text-lg mb-4">
              No submissions found matching your filters.
            </p>
          </div>

          <div
            *ngFor="let submission of filteredSubmissions"
            class="card p-6 hover:shadow-lg transition-all cursor-pointer"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <!-- Left: Status & Problem -->
              <div class="lg:col-span-5">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 pt-1">
                    <div
                      [ngClass]="getStatusIconClass(submission.status)"
                      class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    >
                      <span *ngIf="submission.status === 'Accepted'">✓</span>
                      <span *ngIf="submission.status !== 'Accepted'">✗</span>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-slate-900">
                      {{ submission.problemTitle }}
                    </h3>
                    <p class="text-sm text-slate-600 mt-1">
                      <span
                        [ngClass]="getStatusBadgeClass(submission.status)"
                        class="badge text-xs font-bold px-2.5 py-0.5"
                      >
                        {{ submission.status }}
                      </span>
                      <span class="ml-3 text-slate-500">{{
                        formatDate(submission.timestamp)
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Middle: Code & Stats -->
              <div class="lg:col-span-4">
                <div class="bg-slate-900 rounded p-4 mb-3">
                  <p
                    class="text-slate-300 font-mono text-xs max-h-12 overflow-hidden"
                  >
                    {{ submission.codeSnippet.substring(0, 100) }}...
                  </p>
                </div>
                <div class="flex items-center gap-4 text-sm">
                  <div class="flex items-center gap-1">
                    <span class="text-slate-500">Language:</span>
                    <span class="font-semibold text-slate-900">{{
                      submission.language
                    }}</span>
                  </div>
                  <div class="text-slate-400">|</div>
                  <div class="flex items-center gap-1">
                    <span class="text-slate-500">Tests:</span>
                    <span
                      class="font-semibold"
                      [ngClass]="
                        submission.testsPassed === submission.totalTests
                          ? 'text-success-600'
                          : 'text-danger-600'
                      "
                    >
                      {{ submission.testsPassed }}/{{ submission.totalTests }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right: Performance Metrics -->
              <div class="lg:col-span-3">
                <div class="space-y-2">
                  <div
                    *ngIf="submission.runtime > 0"
                    class="flex justify-between"
                  >
                    <span class="text-slate-600">Runtime:</span>
                    <span class="font-semibold text-slate-900"
                      >{{ submission.runtime }}ms</span
                    >
                  </div>
                  <div
                    *ngIf="submission.memory > 0"
                    class="flex justify-between"
                  >
                    <span class="text-slate-600">Memory:</span>
                    <span class="font-semibold text-slate-900"
                      >{{ submission.memory }}MB</span
                    >
                  </div>
                  <div
                    class="flex justify-between pt-2 border-t border-slate-200"
                  >
                    <span class="text-slate-600">ID:</span>
                    <span class="font-mono text-sm text-slate-500"
                      >#{{ submission.id }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Preview (Expanded) -->
            <div
              class="mt-4 bg-slate-900 rounded-lg p-4 max-h-40 overflow-y-auto"
            >
              <pre
                class="text-slate-300 font-mono text-xs"
                [textContent]="submission.codeSnippet"
              ></pre>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-8">
          <p class="text-slate-600">
            Showing {{ filteredSubmissions.length }} of
            {{ allSubmissions.length }} submissions
          </p>
          <div class="flex gap-2">
            <button class="btn-secondary">Previous</button>
            <button class="btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SubmissionsComponent implements OnInit {
  searchQuery = "";
  selectedStatus = "";
  selectedLanguage = "";
  sortBy = "recent";

  allSubmissions: Submission[] = [];
  filteredSubmissions: Submission[] = [];

  acceptedCount = 0;
  wrongAnswerCount = 0;
  tleCoutt = 0;

  expandedSubmissionId: number | null = null;

  constructor(private submissionService: SubmissionService) {}

  ngOnInit(): void {
    this.submissionService.getAllSubmissions().subscribe((submissions) => {
      this.allSubmissions = submissions;
      this.updateStats();
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredSubmissions = this.allSubmissions.filter((submission) => {
      const matchesSearch = submission.problemTitle
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesStatus =
        !this.selectedStatus || submission.status === this.selectedStatus;
      const matchesLanguage =
        !this.selectedLanguage || submission.language === this.selectedLanguage;

      return matchesSearch && matchesStatus && matchesLanguage;
    });

    this.applySorting();
  }

  applySorting(): void {
    switch (this.sortBy) {
      case "oldest":
        this.filteredSubmissions.sort(
          (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
        );
        break;
      case "runtime":
        this.filteredSubmissions.sort((a, b) => a.runtime - b.runtime);
        break;
      case "memory":
        this.filteredSubmissions.sort((a, b) => a.memory - b.memory);
        break;
      case "recent":
      default:
        this.filteredSubmissions.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
        );
        break;
    }
  }

  updateStats(): void {
    this.acceptedCount = this.allSubmissions.filter(
      (s) => s.status === "Accepted",
    ).length;
    this.wrongAnswerCount = this.allSubmissions.filter(
      (s) => s.status === "Wrong Answer",
    ).length;
    this.tleCoutt = this.allSubmissions.filter(
      (s) => s.status === "Time Limit Exceeded",
    ).length;
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

  getStatusIconClass(status: string): string {
    const classes: Record<string, string> = {
      Accepted: "bg-success-600",
      "Wrong Answer": "bg-danger-600",
      "Time Limit Exceeded": "bg-warning-600",
      "Runtime Error": "bg-danger-600",
      "Compilation Error": "bg-danger-600",
      "Memory Limit Exceeded": "bg-warning-600",
    };
    return classes[status] || "bg-primary-600";
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
