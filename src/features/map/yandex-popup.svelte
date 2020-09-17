<style>
  .yandex-popup {
    position: absolute;
    top: 60px;
    right: 60px;
    z-index: 1;
    width: 286px;
    background: var(--white);
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.16);
    border-radius: 16px;
  }

  .yandex-popup-img {
    width: 100%;
    height: 180px;
  }

  .popup-image {
    border-radius: 3.81333px 3.81333px 0px 0px;
  }

  .yandex-popup-info {
    font-weight: normal;
    padding: 16px 14px;
    font-size: 14px;
    line-height: 20px;
  }
  .yandex-popup-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 4px;
  }
  .yandex-popup-text {
    color: rgba(0, 0, 0, 0.92);
    margin-bottom: 4px;
  }
  .yandex-popup-address {
    color: rgba(0, 0, 0, 0.56);
    margin-bottom: 4px;
  }

  .line {
    display: block;
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.08);
    margin: 16px 0;
  }
  .yandex-popup-tablet {
    width: 100%;
    text-align: left;
  }

  .tablet-title {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.2px;
    color: rgba(0, 0, 0, 0.56);
  }
  .yandex-popup-footer {
    display: block;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    padding: 10px 0;
  }
  .yandex-popup-link {
    text-decoration: none;
    color: var(--black);
  }
  .yandex-popup-way {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .way-item {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.56);
  }
  .way-item:first-of-type {
    margin-left: 5px;
    margin-right: 3px;
  }

  .way-transport {
    & span {
      margin-right: 7px;
    }
  }

  .delivery-time::first-letter {
    text-transform: uppercase;
  }
</style>

<script>
  import MetroSVG from './metroSVG';
  import TransportSVG from './transportSVG.svelte';
  import FootSVG from './footSVG';
  import { infoPopup } from './models';

  import { setMonthYear } from '../../utils/quarters-dates.js';

  let metroLine;
  let metroTime;
  let realtyUrl;

  $: {
    metroLine = $infoPopup.metro_line ? `${$infoPopup.metro_line}, ` : '';
    metroTime = $infoPopup.time_to_metro
      ? `${$infoPopup.time_to_metro} мин.`
      : '';

    realtyUrl = `https://${$infoPopup.url}?utm_source=spravochnik&utm_medium=article&utm_campaign=karta_novostroek`;
  }
</script>

<div class="yandex-popup">
  {#if $infoPopup.main_photo}
    <div class="yandex-popup-img">
      <a href="{realtyUrl}" target="blank">
        <img
          class="popup-image"
          src="{`https:${$infoPopup.main_photo}`}"
          alt="{$infoPopup.name || ''}"
        />
      </a>
    </div>
  {/if}
  <div class="yandex-popup-info">
    {#if $infoPopup.name}
      <h3 class="yandex-popup-title">
        <a class="yandex-popup-link" href="{realtyUrl}" target="blank">
          {$infoPopup.name}
        </a>
      </h3>
    {/if}
    {#if $infoPopup.developer_name}
      <p class="yandex-popup-text">{$infoPopup.developer_name}</p>
    {/if}
    {#if $infoPopup.address}
      <p class="yandex-popup-address">{$infoPopup.address}</p>
    {/if}
    {#if metroLine}
      <div class="yandex-popup-way">
        <MetroSVG />
        <div class="way-item">{metroLine}</div>
        <div class="way-item way-transport">
          <span>{metroTime}</span>
          {#if $infoPopup.mode_of_transport === 'on_foot'}
            <FootSVG />
          {:else}
            <TransportSVG />
          {/if}
        </div>

      </div>
    {/if}
    <div class="line"></div>
    <table class="yandex-popup-tablet">
      <tr>
        {#if $infoPopup.description}
          <th class="tablet-title">Очередь</th>
        {/if}

        {#if $infoPopup.building_site_name}
          <th class="tablet-title">Корпус</th>
        {/if}
        <th class="tablet-title ">Дата сдачи</th>
      </tr>
      <tr>
        {#if $infoPopup.description}
          <td>{$infoPopup.description}</td>
        {/if}
        {#if $infoPopup.building_site_name}
          <td>{$infoPopup.building_site_name}</td>
        {/if}
        <td class="delivery-time">{setMonthYear($infoPopup.day) || ''}</td>
      </tr>
    </table>
  </div>
  <div class="yandex-popup-footer">
    <a class="yandex-popup-link" href="{realtyUrl}" target="blank">Подробнее</a>
  </div>

</div>
