// COPIED FROM https://github.com/sindresorhus/refined-github/blob/master/src/libs/page-detect.js

import * as select from 'select-dom';


export const isDashboard = () => location.pathname === '/' || /^(\/orgs\/[^/]+)?\/dashboard/.test(location.pathname);

export const isTrending = () => location.pathname.startsWith('/trending');

export const getRepoPath = () => location.pathname.replace(/^\/[^/]+\/[^/]+/, '');

export const getRepoURL = () =>
  location.pathname
    .slice(1)
    .split('/', 2)
    .join('/');



export const isRepoTree = () => isRepo() && /\/tree\//.test(getRepoPath());

export const isIssueSearch = () => location.pathname.startsWith('/issues');

export const isIssueList = () => isRepo() && /^\/issues\/?$/.test(getRepoPath());

export const isIssue = () => isRepo() && /^\/issues\/\d+/.test(getRepoPath());

export const isPRSearch = () => location.pathname.startsWith('/pulls');

export const isPRList = () => isRepo() && /^\/pulls\/?$/.test(getRepoPath());

export const isPR = () => isRepo() && /^\/pull\/\d+/.test(getRepoPath());

export const isPRFiles = () => isRepo() && /^\/pull\/\d+\/files/.test(getRepoPath());

export const isPRCommit = () => isRepo() && /^\/pull\/\d+\/commits\/[0-9a-f]{5,40}/.test(getRepoPath());


export const isMilestoneList = () => isRepo() && /^\/milestones\/?$/.test(getRepoPath());

export const isMilestone = () => isRepo() && /^\/milestone\/\d+/.test(getRepoPath());

export const isLabelList = () => isRepo() && /^\/labels\/?(((?=\?).*)|$)/.test(getRepoPath());

export const isLabel = () => isRepo() && /^\/labels\/\w+/.test(getRepoPath());

export const isCommitList = () => isRepo() && /^\/commits\//.test(getRepoPath());

export const isSingleCommit = () => isRepo() && /^\/commit\/[0-9a-f]{5,40}/.test(getRepoPath());


export const isCompare = () => isRepo() && /^\/compare/.test(getRepoPath());

export const isQuickPR = () => isCompare() && /[?&]quick_pull=1(&|$)/.test(location.search);

export const hasCode = () => isRepo() && select.exists('.highlight');

export const hasDiff = () =>
  isRepo() &&
  (isSingleCommit() || isPRCommit() || isPRFiles() || isCompare() || (isPR() && select.exists('.diff-table')));

export const isReleases = () => isRepo() && /^\/(releases|tags)/.test(getRepoPath());

export const isBlame = () => isRepo() && /^\/blame\//.test(getRepoPath());

export const isNotifications = () => location.pathname.startsWith('/notifications');

export const isRepoSettings = () => isRepo() && /^\/settings/.test(getRepoPath());

export const getOwnerAndRepo = () => {
  const [, ownerName, repoName] = location.pathname.split('/');

  return {
    ownerName,
    repoName
  };
};

export const hasCommentForm = () => select.exists('.js-previewable-comment-form');

/**
 * Github related detections
 */
// @todo Replace with DOM-based test because this is too generic #708
export const isRepo = () => !isGist() && !isTrending() && /^\/[^/]+\/[^/]+/.test(location.pathname);

export const isSingleFile = () => {
  const { ownerName, repoName } = getOwnerAndRepo();
  const blobPattern = new RegExp(`/${ownerName}/${repoName}/blob/`);
  return isRepo() && blobPattern.test(location.href);
};

export const isCommit = () => isSingleCommit() || isPRCommit() || (isPRFiles() && select.exists('.full-commit'));

export const isRepoRoot = () =>
  isRepo() && /^(\/?$|\/tree\/)/.test(getRepoPath()) && select.exists('.repository-meta-content');

export const isHistoryForFile = () => isRepo() && /^\/commits\/[0-9a-f]{5,40}\/.+/.test(getRepoPath());

export const isGist = () => location.hostname.startsWith('gist.') || location.pathname.startsWith('gist/');

/**
 * BitBucket related detections
 */
export const isBitBucketRepo = () => select.exists('#source-container');

/**
 * GitLab related detections
 */
export const isGitLabRepo = () => select.exists('.project-show-files');

/**
 * Pastebin related detections
 */
export const isPastebinUserList = () => (location.href.indexOf('pastebin.com/u/') > 0)
  && select.exists('table.maintable');