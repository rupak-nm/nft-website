import Link from 'next/link'

import HamburgerButton from '@/components/Header/HamburgerButton'
import Navigation from '@/components/Header/Navigation'
import SubMenu from '@/components/Header/SubMenu'
import { ThemeSelector } from '@/components/Header/ThemeSelector'
import { videoData } from '@/components/Header/videoData'
import VideoModal from '@/components/VideoModal'
import { data } from '@/utils/nav'

import NpmDarkLogo from '../../elements/npm/npm-logo-dark-mode.svg'
import NpmLightLogo from '../../elements/npm/npm-logo-light-mode.svg'

const updatedVideos = videoData.map((video) => ({
  ...video,
  thumbnail: { ...video.thumbnail, url: '' }
}))

const Header = ({ headerStyle }) => {
  return (
    <>
      <VideoModal />
      <header data-style={headerStyle}>
        <div className='inner container'>
          <div className='logo and rest'>
            <Link className='logo' href='/'>
              <span className='sr-only'>Neptune Mutual</span>
              <span className='light only'><NpmLightLogo /></span>
              <span className='dark only'><NpmDarkLogo /></span>
            </Link>

            <div
              className='nav with language and theme'
              data-open='false'
              id='MobileMenu'
            >
              <Navigation data={data} />

              <div className='language and theme only'>
                <ThemeSelector />
              </div>

              <SubMenu data={data} videos={updatedVideos} />
            </div>
          </div>

          <HamburgerButton />
        </div>
      </header>
      <hr />
    </>
  )
}

export { Header }
