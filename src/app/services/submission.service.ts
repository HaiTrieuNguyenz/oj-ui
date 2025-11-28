import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Submission } from '../models/submission.model';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  private mockSubmissions: Submission[] = [
    {
      id: 1,
      problemId: 1,
      problemTitle: 'Two Sum',
      language: 'JavaScript',
      status: 'Accepted',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      runtime: 52,
      memory: 42.3,
      codeSnippet: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      testsPassed: 50,
      totalTests: 50,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 2,
      problemId: 1,
      problemTitle: 'Two Sum',
      language: 'JavaScript',
      status: 'Wrong Answer',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      runtime: 0,
      memory: 0,
      codeSnippet: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
      testsPassed: 48,
      totalTests: 50,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 3,
      problemId: 2,
      problemTitle: 'Longest Substring Without Repeating Characters',
      language: 'Python',
      status: 'Accepted',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      runtime: 68,
      memory: 15.4,
      codeSnippet: `def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}
    max_length = 0
    start = 0
    for end in range(len(s)):
        if s[end] in char_index:
            start = max(start, char_index[s[end]] + 1)
        char_index[s[end]] = end
        max_length = max(max_length, end - start + 1)
    return max_length`,
      testsPassed: 52,
      totalTests: 52,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 4,
      problemId: 3,
      problemTitle: 'Median of Two Sorted Arrays',
      language: 'Java',
      status: 'Time Limit Exceeded',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      runtime: 5000,
      memory: 128.5,
      codeSnippet: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    List<Integer> merged = new ArrayList<>();
    for (int num : nums1) merged.add(num);
    for (int num : nums2) merged.add(num);
    Collections.sort(merged);
    int n = merged.size();
    if (n % 2 == 0) {
        return (merged.get(n/2-1) + merged.get(n/2)) / 2.0;
    }
    return merged.get(n/2);
}`,
      testsPassed: 15,
      totalTests: 25,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 5,
      problemId: 4,
      problemTitle: 'Valid Parentheses',
      language: 'TypeScript',
      status: 'Accepted',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      runtime: 45,
      memory: 38.2,
      codeSnippet: `function isValid(s: string): boolean {
    const stack: string[] = [];
    const pairs: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    for (const char of s) {
        if (char in pairs) {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      testsPassed: 78,
      totalTests: 78,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 6,
      problemId: 5,
      problemTitle: 'Merge K Sorted Lists',
      language: 'C++',
      status: 'Runtime Error',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      runtime: 0,
      memory: 0,
      codeSnippet: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    if (lists.empty()) return nullptr;
    while (lists.size() > 1) {
        vector<ListNode*> mergedLists;
        for (int i = 0; i < lists.size(); i += 2) {
            ListNode* l1 = lists[i];
            ListNode* l2 = i + 1 < lists.size() ? lists[i + 1] : nullptr;
            mergedLists.push_back(merge(l1, l2));
        }
        lists = mergedLists;
    }
    return lists[0];
}`,
      testsPassed: 5,
      totalTests: 20,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 7,
      problemId: 1,
      problemTitle: 'Two Sum',
      language: 'Python',
      status: 'Accepted',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      runtime: 48,
      memory: 14.8,
      codeSnippet: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      testsPassed: 50,
      totalTests: 50,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 8,
      problemId: 6,
      problemTitle: 'Word Ladder',
      language: 'JavaScript',
      status: 'Compilation Error',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      runtime: 0,
      memory: 0,
      codeSnippet: `function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    const queue = [[beginWord, 1]];
    while (queue.length > 0) {
        const [word, level] = queue.shift();
        if (word === endWord) return level;
        for (let i = 0; i < word.length; i++) {
            for (let c = 'a'.charCodeAt(0); c <= 'z'.charCodeAt(0); c++) {`,
      testsPassed: 0,
      totalTests: 30,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 9,
      problemId: 2,
      problemTitle: 'Longest Substring Without Repeating Characters',
      language: 'JavaScript',
      status: 'Wrong Answer',
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      runtime: 0,
      memory: 0,
      codeSnippet: `function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    for (let i = 0; i < s.length; i++) {
        const seen = new Set();
        for (let j = i; j < s.length; j++) {
            if (seen.has(s[j])) break;
            seen.add(s[j]);
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }
    return maxLength;
}`,
      testsPassed: 48,
      totalTests: 52,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 10,
      problemId: 4,
      problemTitle: 'Valid Parentheses',
      language: 'Python',
      status: 'Accepted',
      timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      runtime: 32,
      memory: 13.2,
      codeSnippet: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')', '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return not stack`,
      testsPassed: 78,
      totalTests: 78,
      userId: 'user1',
      userName: 'John Doe',
    },
    {
      id: 11,
      problemId: 5,
      problemTitle: 'Merge K Sorted Lists',
      language: 'Python',
      status: 'Memory Limit Exceeded',
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      runtime: 3500,
      memory: 512.0,
      codeSnippet: `def mergeKLists(lists):
    if not lists:
        return None
    all_values = []
    for lst in lists:
        curr = lst
        while curr:
            all_values.append(curr.val)
            curr = curr.next
    all_values.sort()
    if not all_values:
        return None
    merged = ListNode(all_values[0])
    curr = merged
    for val in all_values[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return merged`,
      testsPassed: 10,
      totalTests: 20,
      userId: 'user1',
      userName: 'John Doe',
    },
  ];

  getSubmissionsByProblemId(problemId: number): Observable<Submission[]> {
    return of(this.mockSubmissions.filter((s) => s.problemId === problemId));
  }

  getAllSubmissions(): Observable<Submission[]> {
    return of(this.mockSubmissions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }

  getSubmissionById(id: number): Observable<Submission | undefined> {
    return of(this.mockSubmissions.find((s) => s.id === id));
  }

  addSubmission(submission: Submission): Observable<Submission> {
    const newSubmission = {
      ...submission,
      id: Math.max(...this.mockSubmissions.map((s) => s.id), 0) + 1,
    };
    this.mockSubmissions.push(newSubmission);
    return of(newSubmission);
  }
}
