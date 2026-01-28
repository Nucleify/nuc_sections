<template>
  <div id="contact">
    <div class="contact-banner container">
      <div class="contact-decoration contact-decoration-left">
        <Icon name="mdi:email-outline" />
      </div>
      
      <div class="contact-left">
        <span class="contact-badge">LET'S CONNECT</span>
        <h3 class="contact-heading">Have a project in mind?</h3>
        <p class="contact-text">
          Let's talk about how we can bring your vision to life.
          <span class="highlight">Quick response guaranteed.</span>
        </p>
        
        <div class="contact-features">
          <div class="feature">
            <Icon name="mdi:clock-fast" />
            <span>8h response</span>
          </div>
          <div class="feature">
            <Icon name="mdi:credit-card-off-outline" />
            <span>No upfront payment</span>
          </div>
          <div class="feature">
            <Icon name="mdi:thumb-up-outline" />
            <span>Satisfaction guaranteed</span>
          </div>
        </div>
      </div>

      <div class="contact-divider"></div>

      <div class="contact-right">
        <ad-button
          class="contact-button"
          label="Get in Touch"
          @click="showDialog = true"
        />
        <span class="contact-email">business@nucleify.io</span>
      </div>
      
      <div class="contact-decoration contact-decoration-right">
        <Icon name="mdi:rocket-launch-outline" />
      </div>
    </div>

    <Dialog
      v-model:visible="showDialog"
      :modal="true"
      :dismissable-mask="true"
      :draggable="false"
      :show-header="false"
    >
      <nuc-section-email-us @success="showDialog = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showDialog = ref(false)
</script>
