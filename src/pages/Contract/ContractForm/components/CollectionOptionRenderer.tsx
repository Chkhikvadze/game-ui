import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'

type CollectionOptionRendererProps = {
  label: string
  text: string
}

const CollectionOptionRenderer = ({ label, text }: CollectionOptionRendererProps) => {
  return (
    <div>
      {text && (
        <Typography
          value={text}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />
      )}

      <Tags key={label} label={label} readOnly outlined={true} color={Tags.colors.white} />
    </div>
  )
}

export default CollectionOptionRenderer
