<template>
  <div class="container mx-auto md:max-w-md my-4">
    <TCardList
      collection="outreaches"
      title="Outreaches"
      add="Add"
      :fields="fields"
    >
      <template v-slot:default="{ item }">
        <div class="p-4 card-item">
          <div class="font-bold text-xl mb-2">{{ item.title }}</div>
          <TPreview class="mb-2" :content="item.description" />
        </div>
      </template>
    </TCardList>
  </div>
</template>

<script>
import TCardList from '~/components/TCardList'
import TPreview from '~/components/TPreview'

export default {
  components: {
    TCardList,
    TPreview
  },
  setup() {
    const fields = [
      {
        name: 'title',
        label: 'Title'
      },
      {
        name: 'description',
        label: 'Description',
        type: 'markdown'
      }
    ]

    return {
      fields
    }
  }
}
</script>
