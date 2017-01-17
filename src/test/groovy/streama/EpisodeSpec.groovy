package streama
import grails.test.mixin.TestFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.domain.DomainClassUnitTestMixin} for usage instructions
 */
@TestFor(Episode)
class EpisodeSpec extends Specification {

    void "test episode naming"() {
        setup:
        def episode0 = Episode.newInstance()
        def episode1 = Episode.newInstance()
        episode0.season_number = 1
        episode0.episode_number = 33
        episode0.beforeUpdate()

        episode1.season_number = 640
        episode1.episode_number = 2
        episode1.beforeUpdate()

        expect:
        episode0.episodeString == "s01e33"
        episode1.episodeString == "s640e02"
    }
}
