import ProjectRepository from '@/utils/repository/project/ProjectRepository'
import PostRepository from '@/utils/repository/post/PostRepository'
import FileRepository from '@/utils/repository/file/FileRepository'
import AccountRepository from '@/utils/repository/account/AccountRepository'
import TierRepository from '@/utils/repository/tier/TierRepository'
import GoalRepository from '@/utils/repository/goal/GoalRepository'
import UserTierRepository from '@/utils/repository/tier/UserTierRepository'
import UserGoalRepository from '@/utils/repository/goal/UserGoalRepository'
import StatisticsRepository from '@/utils/repository/statistics/StatisticsRepository'
import ProjectSearchRepository from '@/utils/repository/search/ProjectSearchRepository'
import AuthRepository from '@/utils/repository/auth/authRepository'

const REPOSITORIES = {
  project: ProjectRepository,
  post: PostRepository,
  file: FileRepository,
  account: AccountRepository,
  tier: TierRepository,
  goal: GoalRepository,
  userTier: UserTierRepository,
  userGoal: UserGoalRepository,
  statistics: StatisticsRepository,
  search: ProjectSearchRepository,
  auth: AuthRepository
}

export const RepositoryFactory = {
  get (name) {
    return REPOSITORIES[name]
  }
}
