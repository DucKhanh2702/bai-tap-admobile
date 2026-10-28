import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPosition,
  BannerAdSize,
  BannerAdPluginEvents,
  InterstitialAdPluginEvents,
} from '@capacitor-community/admob';
import { ADMOB_APP_ID, BANNER_AD_UNIT_ID, INTERSTITIAL_AD_UNIT_ID } from './ad-config.js';

const native = Capacitor.isNativePlatform();
let canRequestAds = false;
let initialized = false;
let interstitialReady = false;
let preparePromise;
let dismissInterstitial;

async function prepareInterstitial() {
  if (!native || !canRequestAds || interstitialReady) return interstitialReady;
  if (preparePromise) return preparePromise;
  preparePromise = AdMob.prepareInterstitial({ adId: INTERSTITIAL_AD_UNIT_ID })
    .then(() => (interstitialReady = true))
    .catch((error) => {
      console.warn('AdMob interstitial is not ready:', error);
      return false;
    })
    .finally(() => { preparePromise = undefined; });
  return preparePromise;
}

async function start() {
  if (!native) return;
  document.body.classList.add('native-app');

  try {
    let consent = await AdMob.requestConsentInfo();
    if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
      consent = await AdMob.showConsentForm();
    }
    canRequestAds = consent.canRequestAds;
    if (!canRequestAds) return;

    await AdMob.initialize();
    initialized = true;

    await AdMob.addListener(BannerAdPluginEvents.SizeChanged, ({ height }) => {
      document.documentElement.style.setProperty('--native-banner-height', `${height}px`);
    });
    await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
      console.warn('AdMob banner failed to load:', error);
    });
    await AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
      dismissInterstitial?.(true);
      dismissInterstitial = undefined;
      interstitialReady = false;
      void prepareInterstitial();
    });
    await AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
      console.warn('AdMob interstitial failed to show:', error);
      dismissInterstitial?.(false);
      dismissInterstitial = undefined;
      interstitialReady = false;
    });

    await AdMob.showBanner({
      adId: BANNER_AD_UNIT_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
    });
    void prepareInterstitial();
  } catch (error) {
    console.error('AdMob setup failed; the app will continue without ads:', error);
  }
}

async function showInterstitial() {
  if (!native || !initialized || !canRequestAds) return false;
  const ready = await prepareInterstitial();
  if (!ready) return false;

  interstitialReady = false;
  const dismissed = new Promise((resolve) => { dismissInterstitial = resolve; });
  try {
    await AdMob.showInterstitial({ adId: INTERSTITIAL_AD_UNIT_ID });
    return await dismissed;
  } catch (error) {
    console.warn('AdMob interstitial could not be shown:', error);
    dismissInterstitial = undefined;
    return false;
  }
}

window.pawPalsAds = { native, start, showInterstitial };
