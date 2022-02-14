import logo from '../../logo.svg';
import homeLogo from '../../wayfair-partner-home-logo.svg';

export const navIconStyle = {
    minWidth: '30px',
    marginLeft: '2px'
  }

export const WayfairIcon =  () => <img src={logo} data-testid = 'appLogo' height={80} width={80} className='App-logo' alt="logo" />

export const WayfairPartnerHomeLogo =  () => <img data-testid = 'partnerHomeLogo' src= {homeLogo} height={ 30 } alt="logo" />