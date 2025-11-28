import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  problemsSolved: number;
  acceptanceRate: number;
  lastSubmission: Date;
}

@Component({
  selector: "app-leaderboard",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-slate-50 min-h-screen py-8">
      <div class="container-max">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-bold text-slate-900 mb-2">Leaderboard</h1>
          <p class="text-lg text-slate-600">
            See who's on top of the game
          </p>
        </div>

        <!-- Leaderboard Table -->
        <div class="bg-white rounded-lg border border-slate-200">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-slate-200">
              <thead class="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Problems Solved
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Acceptance Rate
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Last Submission
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-slate-200">
                <tr
                  *ngFor="let user of leaderboard"
                  class="hover:bg-slate-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-lg font-bold text-slate-900">
                      #{{ user.rank }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img
                          class="h-10 w-10 rounded-full"
                          [src]="user.avatar"
                          alt=""
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-slate-900">
                          {{ user.username }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-900">
                      {{ user.problemsSolved }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-slate-900">
                      {{ user.acceptanceRate | percent }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {{ formatDate(user.lastSubmission) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardEntry[] = [];

  ngOnInit(): void {
    this.leaderboard = [
      {
        rank: 1,
        username: "CodeMaster",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        problemsSolved: 150,
        acceptanceRate: 0.85,
        lastSubmission: new Date("2025-11-27T10:30:00Z"),
      },
      {
        rank: 2,
        username: "AlgoQueen",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
        problemsSolved: 145,
        acceptanceRate: 0.9,
        lastSubmission: new Date("2025-11-27T11:00:00Z"),
      },
      {
        rank: 3,
        username: "BytePioneer",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
        problemsSolved: 130,
        acceptanceRate: 0.78,
        lastSubmission: new Date("2025-11-26T15:00:00Z"),
      },
      {
        rank: 4,
        username: "ScriptKid",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
        problemsSolved: 120,
        acceptanceRate: 0.82,
        lastSubmission: new Date("2025-11-27T09:00:00Z"),
      },
      {
        rank: 5,
        username: "LogicLord",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026708d",
        problemsSolved: 110,
        acceptanceRate: 0.88,
        lastSubmission: new Date("2025-11-25T18:00:00Z"),
      },
    ];
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
