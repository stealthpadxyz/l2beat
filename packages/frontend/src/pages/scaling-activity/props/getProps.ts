import { ActivityApiResponse, VerificationStatus } from '@l2beat/shared-pure'

import { Config } from '../../../build/config'
import { getFooterProps, getNavbarProps } from '../../../components'
import { getScalingFactor } from '../../../utils/activity/getScalingFactor'
import { Wrapped } from '../../Page'
import { ActivityPageProps } from '../view/ScalingActivityPage'
import { getPageMetadata } from './getPageMetadata'
import { getScalingActivityView } from './getScalingActivityView'

export function getProps(
  config: Config,
  pagesData: {
    activityApiResponse: ActivityApiResponse
    verificationStatus: VerificationStatus
  },
): Wrapped<ActivityPageProps> {
  const { activityApiResponse, verificationStatus } = pagesData

  const scalingFactor = getScalingFactor(activityApiResponse)

  return {
    props: {
      navbar: getNavbarProps(config, 'scaling'),
      scalingFactor,
      apiEndpoint: '/api/activity/combined.json',
      activityView: getScalingActivityView(
        config.layer2s,
        activityApiResponse,
        verificationStatus,
      ),
      footer: getFooterProps(config),
      showActivity: config.features.activity,
      showDetailedTvl: config.features.detailedTvl,
      milestones: config.features.milestones ? config.milestones : [],
    },
    wrapper: {
      metadata: getPageMetadata(),
      preloadApi: '/api/activity/combined.json',
    },
  }
}
