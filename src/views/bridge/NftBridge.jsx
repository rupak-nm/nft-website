import React, { useState } from 'react'

import Link from 'next/link'

import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { Button } from '@/components/Button/Button'
import { ConnectWallet } from '@/components/ConnectWallet/ConnectWallet'
import { NftCard } from '@/components/NftCard/NftCard'
import { bridgeConfig } from '@/config/bridge'
import { AppConstants } from '@/constants/AppConstants'
import { Icon } from '@/elements/Icon'
import useNftBridge from '@/hooks/actions/useNftBridge'
import { useUserNfts } from '@/hooks/data/useUserNfts'
import { imageOrigin } from '@/services/marketplace-api'
import ChainSelector from '@/views/bridge/ChainSelector'
import { useWeb3React } from '@web3-react/core'

const crumbs = [
  {
    link: '/',
    name: 'NFT Home'
  },
  {
    link: '/my-collection',
    name: 'My NFT Collection'
  },
  {
    link: '#',
    name: 'NFT Bridge'
  }
]

const NftBridge = () => {
  const { account } = useWeb3React()

  const { userNFTs } = useUserNfts(account)

  const nonSoulboundNFts = userNFTs.filter(nft => { return !nft.soulbound })

  const [selectedNfts, setSelectedNfts] = useState([])

  const currentNetwork = bridgeConfig[AppConstants.NETWORK]

  const otherNetworks = Object.values(bridgeConfig).filter((value) => { return value.chainId !== currentNetwork.chainId && value.isTestnet === currentNetwork.isTestnet })

  const initialDestinationNetwork = otherNetworks.length > 0 ? otherNetworks[0] : currentNetwork

  const [sourceChainId, setSourceChainId] = useState(AppConstants.NETWORK)

  const [destinationChainId, setDestinationChainId] = useState(initialDestinationNetwork.chainId)

  const [stage, setStage] = useState(1)

  // Stage 1: Source & Destination Selection
  // Stage 2: Bridge

  const { balance, fees } = useNftBridge(selectedNfts, destinationChainId)

  return (
    <div className='nft bridge page'>
      <div className='inner content'>

        <div className='breadcrumb and connect wallet'>
          <Breadcrumb items={crumbs} />
          <ConnectWallet />
        </div>

        {stage === 1 && (
          <div className='bridge selection'>
            <div>
              <img src='/assets/images/bridge/display.webp' alt='Salacia' />
            </div>
            <div>
              <div className='selectors'>
                <h1>Move NFTs across different blockchain networks.</h1>
                <div className='selection box'>
                  <div className='source selection container'>
                    <div className='label'>Departure Chain</div>
                    <ChainSelector selectedChain={sourceChainId} setSelectedChain={setSourceChainId} />
                  </div>
                  <div className='destination selection container'>
                    <div className='label'>Destination Chain</div>
                    <ChainSelector selectedChain={destinationChainId} setSelectedChain={setDestinationChainId} />
                  </div>

                  <div className='vertical switch'>
                    <Icon variant='switch-vertical-02' size='lg' />
                  </div>
                </div>
                <Button
                  type='primary' size='2xl' onClick={() => {
                    setStage(2)
                  }}
                >Proceed to Bridging
                </Button>
              </div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className='bridge section'>
            <section className='collection selection'>
              <div className='title'>
                <div className='left'>
                  Your NFTs on
                  <ChainSelector selectedChain={sourceChainId} setSelectedChain={setSourceChainId} />
                </div>
                <div className='right'>
                  <label htmlFor='search' className='label-hidden'>Search </label>
                  <input
                    id='search'
                    placeholder='Search'
                    className='search input'
                    aria-label='Search'
                  />

                  <Button
                    variant='secondary-gray'
                    size='md'
                    iconTrailing='filter-lines'
                    classname='filter button'
                  >
                    Sort by: Recent
                  </Button>
                </div>

              </div>

              <div className='actions'>
                <Link href='/my-collection/bridge/history'>Transaction History</Link>
                <Button variant='secondary-gray' iconTrailing='download-01'>Import</Button>
              </div>

              <div className='nft selection'>
                <div className='nft list'>
                  {nonSoulboundNFts.map((nft) => {
                    return (
                      <NftCard
                        selectable
                        checked={selectedNfts.includes(nft.tokenId)}
                        setChecked={(selected) => {
                          if (selected) {
                            setSelectedNfts([...selectedNfts, nft.tokenId])
                          } else {
                            setSelectedNfts(selectedNfts.filter(x => { return x !== nft.tokenId }))
                          }
                        }}
                        key={nft.tokenId}
                        name={nft.nickname}
                        nftId={nft.tokenId}
                        views={nft.views}
                        count={nft.siblings}
                        image={`${imageOrigin}/thumbnails/${nft.tokenId}.webp`}
                        soulbound={nft.soulbound}
                        minted={!!nft.tokenOwner}
                      />
                    )
                  })}
                </div>
                {nonSoulboundNFts.length === 0 && (
                  <div className='no nft found'>
                    <img src='/assets/images/bridge/bridge_no_nft_bg.webp' alt='Background NFT' srcset='' />
                    <div className='text'>No NFTs Found</div>
                  </div>
                )}
              </div>
            </section>
            <section className='destination'>
              <div className='chain'>
                Destination
                <ChainSelector selectedChain={destinationChainId} setSelectedChain={setDestinationChainId} />
              </div>

              <input
                id='destination'
                placeholder='Destination Address'
                className='destination input'
                aria-label='Destination Address'
              />

              <div className='selected info'>
                <h3>NFTs Selected <span>{selectedNfts.length}/{nonSoulboundNFts.length}</span></h3>
                <div>
                  Balance: <span title={balance.long}>{balance.short}</span>
                </div>
                <div className='fees'>
                  <div>

                    Fees
                  </div>
                  <div title={fees.long}>{fees.short}</div>
                </div>

                <Button size='2xl'>Approve</Button>
              </div>
            </section>
          </div>
        )}

      </div>
    </div>
  )
}

export default NftBridge
