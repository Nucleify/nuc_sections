<template>
  <div id="contact">
    <div class="contact-banner container">
      <div class="contact-decoration contact-decoration-left">
        <Icon name="mdi:email-outline" />
      </div>
      
      <div class="contact-left">
        <span class="contact-badge">{{ $t('contact-badge') }}</span>
        <h3 class="contact-heading">{{ $t('contact-heading') }}</h3>
        <p class="contact-text">
          {{ $t('contact-text') }}
          <span class="highlight">{{ $t('contact-text-highlight') }}</span>
        </p>
        
        <div class="contact-features">
          <div class="feature">
            <Icon name="mdi:clock-fast" />
            <span>{{ $t('contact-feat-response') }}</span>
          </div>
          <div class="feature">
            <Icon name="mdi:credit-card-off-outline" />
            <span>{{ $t('contact-feat-payment') }}</span>
          </div>
          <div class="feature">
            <Icon name="mdi:thumb-up-outline" />
            <span>{{ $t('contact-feat-satisfaction') }}</span>
          </div>
        </div>
      </div>

      <div class="contact-divider"></div>

      <div class="contact-right">
        <nuc-section-email-us-dialog button-class="contact-button" />
        <a href="mailto:business@nucleify.io" class="contact-email">
          business@nucleify.io
        </a>
      </div>
      
      <div class="contact-decoration contact-decoration-right">
        <Icon name="mdi:rocket-launch-outline" />
      </div>
    </div>
  </div>
</template>
