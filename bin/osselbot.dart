import 'dart:async';
import 'dart:math';

import 'package:nyxx/nyxx.dart';
import 'package:nyxx_commander/commander.dart';
import 'package:nyxx_interactions/interactions.dart';
import 'package:osselbot/config.dart';
// import 'package:path/path.dart';

void main(List<String> arguments) {
  final bot = Nyxx(Config['token'] as String, 32511);
  bot.onReady.listen((event) {
    randomStatus(bot);
  });

  // Change the Activity every 5 minutes
  Timer.periodic(Duration(minutes: 5), (timer) => randomStatus(bot));

  Interactions(bot)
    ..registerSlashCommand(SlashCommandBuilder(
      'info',
      'gives bot info',
      [],
    )..registerHandler((handler) => infoSlashCommand(handler, bot)))
    ..syncOnReady();

  Commander(bot, prefix: '?')
    ..registerCommand(
        'ping',
        (context, message) => {
              context.reply(MessageBuilder.content('pong! ' +
                  bot.shardManager.shards
                      .elementAt(context.shardId)
                      .gatewayLatency
                      .inMilliseconds
                      .toString() +
                  'ms'))
            })
    ..registerCommand('info', (context, message) async {
      await context.sendMessage(MessageBuilder.embed(
          await infoCommand(bot, context.guild, context.shardId)));
    });
}

// Bot routines

DiscordColor getColor(Member? member) {
  if (member == null) return DiscordColor.black;
  member.roles.forEach((element) async {
    await element.getOrDownload();
  });

  var colorRole = member.roles.firstWhere((element) {
    if (element.getFromCache()?.color == null) return false;
    return element.getFromCache()?.color != DiscordColor.none;
  });
  return colorRole.getFromCache()!.color;
}

void randomStatus(Nyxx bot) {
  var rand = Random();
  var statuses = Config['statuses'] as List<String>;

  bot.setPresence(PresenceBuilder.of(
      status: UserStatus.dnd,
      game: Activity.of(statuses[rand.nextInt(statuses.length - 1)])));
}

// Command embeds

// Info
Future<EmbedBuilder> infoCommand(Nyxx bot, Guild? guild, int? shardId) async {
  var member = await guild!.fetchMember(bot.self.id);

  var color = getColor(member);
  var iconUrl = bot.self.avatarURL();
  int ping;

  if (shardId != null) {
    ping = bot.shardManager.shards
        .elementAt(shardId)
        .gatewayLatency
        .inMilliseconds;
  } else {
    ping = bot.shardManager.gatewayLatency.inMilliseconds;
  }

  var uptimeString = bot.uptime.toString();

  return EmbedBuilder()
    ..addField(name: 'Ping', content: ping.toString() + 'ms', inline: true)
    ..addField(
        name: 'Uptime',
        content: uptimeString.substring(0, uptimeString.length - 7),
        inline: true)
    ..addAuthor((author) {
      author.iconUrl = iconUrl;
      author.name = bot.self.username;
    })
    ..color = color;
}

// Command helpers

// /info command
Future<void> infoSlashCommand(InteractionEvent event, Nyxx bot) async {
  await event.acknowledge();

  await event.respond(MessageBuilder.embed(await infoCommand(
      bot, await event.interaction.guild!.getOrDownload(), null)));
}
