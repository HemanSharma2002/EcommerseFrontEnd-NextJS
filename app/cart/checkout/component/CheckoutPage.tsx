'use client'
import React, { useState } from 'react'
import AddressPage from './AddressPage'
import ConfirmCheckout from './ConfirmCheckout'
import { Button, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, styled } from '@mui/material'
import { Check } from '@mui/icons-material'
import CompletedPage from '@/app/user/order/completed/[orderId]/component/CompletedPage'
import { Auths, useAuth } from '@/app/auth/auth'
import { useRouter } from 'next/navigation'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#002D62',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#002D62',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#002D62',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#002D62',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );
  
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  

type Props = {}

export default function CheckoutPage({}: Props) {
  const auth: Auths = useAuth()
  const router = useRouter()

  if (!auth.Auth) {
    auth.setitemInCart(0)
    router.push(`/user/authorization/signin`)
  }

    const [step, setstep] = useState(1)
    
  return (
    <div>
        <div className=' px-5 py-3 flex flex-col gap-3'>
            <Stepper activeStep={step} alternativeLabel  connector={<QontoConnector />}>
                <Step>
                    <StepLabel StepIconComponent={QontoStepIcon} >Login</StepLabel>
                </Step>
                <Step>
                <StepLabel className=' cursor-pointer' onClick={()=>setstep(1)} StepIconComponent={QontoStepIcon} >Address</StepLabel>
                </Step>
                <Step>
                <StepLabel StepIconComponent={QontoStepIcon} >Confirm</StepLabel>
                </Step>
            </Stepper>
            
        </div>

        {step==1&&<AddressPage setStep={setstep} />}
        {
          step==2&&<ConfirmCheckout setStep={setstep}/>
        }
        {step>2&& <CompletedPage steps={step}/>}
        
    </div>
  )
}