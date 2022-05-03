import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaWallet } from 'react-icons/fa'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../../lib/sanity'

const Transfer = ({ 
  selectedToken, 
  setAction, 
  thirdWebTokens, 
  walletAddress,
 }) => {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  //const [imageUrl, setImageUrl] = useState(null)
  const [activeThirdWebToken, setActiveThirdWebToken] = useState()
  const [balance, setBalance] = useState('Fetching...')

  useEffect(() => {
    const activeToken = thirdWebTokens?.find(
      token => token.address === selectedToken.contractAddress
    )

    setActiveThirdWebToken(activeToken)
  }, [thirdWebTokens, selectedToken])

    useEffect(() => {
      console.log(selectedToken, '🔥')
      //const url = imageUrlBuilder(client).image(selectedToken.logo).url
      //console.log(url)
    }, [selectedToken]) 

    useEffect(() => {
      const getBalance = async () => {
        const balance = await activeThirdWebToken.balanceOf(walletAddress)
        setBalance(balance.displayValue)
      }

      if (activeThirdWebToken) {
        getBalance
      }
    }, [activeThirdWebToken])

    const sendCrypto = async () => {
      console.log('sending crypto')
  
      if (activeThirdWebToken && amount && recipient) {
        setAction('transferring')
        const result = await activeThirdWebToken.transfer(
          recipient,
          amount.toString().concat('000000000000000000'),
        )
        console.log(result)
        setAction('transferred')
      } else {
        console.error('missing data')
      }
    }

  return (
    <Wrapper>
        <Amount>
            <FlexInputContainer>
            <FlexInput
            placeholder='0'
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
                <span>ETH</span>
            </FlexInputContainer>
            <Warning style={{ color: amount && '#0a0b0d' }}>
                Amount is a required field
            </Warning>
        </Amount>
        <TransferForm>
            <Row>
                <FieldName>To</FieldName>
                <Icon>
                    <FaWallet />
                </Icon>
                <Recipient 
                placeholder='Address'
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                />
            </Row>
            <Divider />
            <Row>
                <FieldName>Pay with</FieldName>
                <CoinSelectList>
                    <Icon>
                        <img src="data:image/jpeg;base64,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" />
                    </Icon>
                    <CoinName>Ethereum</CoinName>
                </CoinSelectList>
            </Row>
        </TransferForm>
        <Row>
            <Continue>Continue</Continue>
        </Row>
        <Row>
            <BalanceTitle>ETH Balance</BalanceTitle>
            <Balance>1.2 ETH</Balance>
        </Row>
    </Wrapper>
    )
}

export default Transfer

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`

const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #3773f5;
  }
`

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  text-align: right;
  max-width: 45%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #3773f5;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

const Warning = styled.div`
  /* TRouBLe */
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #8a919e;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`
const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
`

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    /* margin: -0.5rem 1rem; */
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`

const Recipient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`

const CoinSelectList = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`

const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  text-wrap: wrap;
  margin-right: 0.5rem;
`

const Continue = styled.button`
  color: white;
  width: 100%;
  background-color: #3773f5;
  padding: 1rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #4a80f6;
  }
`

const BalanceTitle = styled.div``

const Balance = styled.div``
