'use client'
import Typography from '@mui/material/Typography'
import SafeInfo from '@/components/wallet/SafeInfo'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import AddressLabel from '@/components/wallet/AddressLabel'
import { Button } from '@/components/ui/button'

import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'
import { InputLabel } from '@mui/material'

function SafeAccount(props: BoxProps) {
  const { safeSelected, chainId, safes, setSafeSelected, loginWeb3Auth } = useAccountAbstraction()

  return (
    <div className='border rounded-xl py-6 px-8'>
      <h2 className='font-bold mb-2'>Account Info</h2>
      {!safeSelected && 
        <Button onClick={loginWeb3Auth}>
          Log In
        </Button>
      }

      {/* {!!safes && safes.length > 1 && (
        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel id="switch-address-selector-label">Select Safe</InputLabel>
          <Select
            color="success"
            aria-label="safe address selector"
            id="switch-address-selector"
            labelId="switch-address-selector-label"
            label="Select Safe"
            value={safeSelected}
            onChange={(event: SelectChangeEvent) => setSafeSelected(event.target.value as string)}
          >
            {safes.map((safeAddress) => (
              <MenuItem
                key={safeAddress}
                value={safeAddress}
                onClick={() => setSafeSelected(safeAddress)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <AddressLabel address={safeAddress} />
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )} */}

      {/* Safe Info */}
      {safeSelected && <SafeInfo safeAddress={safeSelected} chainId={chainId} />}
    </div>
  )
}

export default SafeAccount
