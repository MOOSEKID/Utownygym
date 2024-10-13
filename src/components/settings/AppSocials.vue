<template>
  <div class="app-socials q-pb-md">
    <div v-if="loaded" class="q-pt-md row q-col-gutter-md">
      <div class="col-xs-12 col-sm-4">
        <q-expansion-item
          v-for="(item, index) in options"
          :key="index"
          expand-separator
          :icon="item.icon"
          :label="item.name"
          :caption="item.href"
          group="socials"
        >
          <q-card class="socials-card">
            <q-card-section>
              <div class="row q-col-gutter-md">
                <div class="col-xs-12 col-sm-5">
                  <div class="text-label">Social</div>
                  <base-input
                    @update:model-value="onChange(index, $event, 'name')"
                    :model-value="item['name']"
                  >
                    <template #prefix>
                      <q-icon :name="item['icon']" />
                    </template>
                  </base-input>
                </div>
                <div class="col-xs-12 col-sm-7">
                  <div class="text-label">Link</div>
                  <base-input
                    @update:model-value="onChange(index, $event, 'href')"
                    :model-value="item['href']"
                  />
                </div>
                <div class="col-xs-12 col-sm-12">
                  <base-btn
                    link
                    color="negative"
                    @click="onRemove(index)"
                    :label="$t('remove')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <div class="col-xs-12">
        <base-btn
          class="q-ml-md"
          link
          icon="fad fa-plus-circle"
          :label="$t('addNew')"
        >
          <q-menu max-height="200px">
            <q-list class="q-pa-sm" style="min-width: 200px">
              <base-item
                dense
                @click="onAdd(item)"
                v-for="(item, index) in items"
                v-close-popup
                :key="index"
                :icon="item.icon"
                :label="item.name"
                color="grey"
              />
            </q-list>
          </q-menu>
        </base-btn>
      </div>
      <div class="col-sm-12 col-xs-12 flex self-end">
        <q-space />
        <base-btn
          @click="$emit('save')"
          :disable="!changed"
          :loading="loading"
          icon="fad fa-save"
          :label="$t('label.save')"
        />
      </div>
    </div>
    <base-section-skeleton v-else />
  </div>
</template>

<script>
import BaseSectionSkeleton from "../skeleton/BaseSectionSkeleton.vue";

const socialIcons = [
  {
    name: "Facebook",
    icon: "fab fa-facebook",
    href: "https://facebook.com/username",
  },
  {
    name: "Twitter",
    icon: "fab fa-twitter",
    href: "https://twitter.com/username",
  },
  {
    name: "Instagram",
    icon: "fab fa-instagram",
    href: "https://instagram.com/username",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    href: "https://linkedin.com/username",
  },
  {
    name: "YouTube",
    icon: "fab fa-youtube",
    href: "https://youtube.com/username",
  },
  {
    name: "Pinterest",
    icon: "fab fa-pinterest",
    href: "https://pinterest.com/username",
  },
  {
    name: "Snapchat",
    icon: "fab fa-snapchat",
    href: "https://snapchat.com/username",
  },
  {
    name: "Reddit",
    icon: "fab fa-reddit",
    href: "https://reddit.com/username",
  },
  {
    name: "Tumblr",
    icon: "fab fa-tumblr",
    href: "https://tumblr.com/username",
  },
  {
    name: "WhatsApp",
    icon: "fab fa-whatsapp",
    href: "https://whatsapp.com/username",
  },
  { name: "Twitch", icon: "fab fa-twitch", href: "https://twitch.tv/username" },
  {
    name: "GitHub",
    icon: "fab fa-github",
    href: "https://github.com/username",
  },
  {
    name: "Medium",
    icon: "fab fa-medium",
    href: "https://medium.com/username",
  },
  { name: "Slack", icon: "fab fa-slack", href: "https://slack.com/username" },
  {
    name: "Discord",
    icon: "fab fa-discord",
    href: "https://discord.com/username",
  },
  {
    name: "TikTok",
    icon: "fab fa-tiktok",
    href: "https://tiktok.com/username",
  },
  { name: "Skype", icon: "fab fa-skype", href: "https://skype.com/username" },
  {
    name: "Telegram",
    icon: "fab fa-telegram",
    href: "https://telegram.org/username",
  },
  { name: "Vimeo", icon: "fab fa-vimeo", href: "https://vimeo.com/username" },
  {
    name: "SoundCloud",
    icon: "fab fa-soundcloud",
    href: "https://soundcloud.com/username",
  },
];

export default {
  components: { BaseSectionSkeleton },
  props: {
    options: Array,
    loaded: Boolean,
    changed: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      socialIcons,
    };
  },
  emits: ["update", "save"],
  methods: {
    onChange(index, val, key) {
      console.func(
        "components/settings/AppSocials:methods.onChange()",
        arguments
      );
      const options = this.options;
      options[index][key] = val;
      this.$emit("update", options);
    },
    onAdd(item) {
      console.func("components/settings/AppSocials:methods.onAdd()", arguments);
      const options = this.options;
      options.push(item);
      this.$emit("update", options);
    },
    onRemove(index) {
      console.func(
        "components/settings/AppSocials:methods.onRemove()",
        arguments
      );
      const options = this.options;
      options.splice(index, 1);
      this.$emit("update", options);
    },
  },
  computed: {
    items() {
      return this.socialIcons.filter(
        (item) => !this.options.map((item) => item.icon).includes(item.icon)
      );
    },
  },
};
</script>
